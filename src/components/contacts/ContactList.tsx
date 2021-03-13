import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import IStores, { IAppStore, IChatStore, IContactStore, IUserStore } from '@stores/interface'
import { Badge } from 'antd'
import HashLoader from 'react-spinners/HashLoader'
import './ContactList.scss'
import './Contact.scss'
import { Icon } from '@ui'
import $ from 'jquery'

// import { getMessages } from '@actions'

type IProps = {
	contactStore?: IContactStore,
	stores?: IAppStore,
	userStore?: IUserStore
	chatStore?: IChatStore
	appStore?: IAppStore,
	onSelect?: () => void | null;
}

const ContactList = inject((stores: IStores) => ({
	contactStore: stores.contactStore,
	userStore: stores.userStore,
	chatStore: stores.chatStore,
	appStore: stores.appStore
}))(
	observer((props: IProps) => {
		const { contactStore, chatStore, appStore, onSelect, userStore } = props
		let ContactsData = contactStore.contact
		let activeContact = contactStore.activeContact
		const search = contactStore.search
		const hero = userStore.hero
		const filterSwitch = contactStore.filterSwitch

		if (search) {
			// ContactsData = ContactsData.filter((contact: any) => {
			//     let match = false;
			//     let nameSplit = contact.name.toLowerCase().split('')
			//     let searchSplit = search.toLowerCase().split('')
			//     for (let i = 0; i < search.length; i++) {
			//         if (nameSplit[i] === searchSplit[i]) {
			//             match = true
			//         } else {
			//             match = false
			//             break;
			//         }
			//     }

			//     contact.user.find((id: any) => {
			//         let user = userStore.getUser(id)
			//         let splitByWord = user.username.split(' ')
			//         for (let i = 0; i < splitByWord.length; i++) {
			//             const word = splitByWord[i];

			//             let wordSplit = word.toLowerCase().split('')
			//             let searchSplit = search.toLowerCase().split('')
			//             if (!match) {
			//                 for (let i = 0; i < search.length; i++) {
			//                     if (wordSplit[i] === searchSplit[i]) {
			//                         match = true
			//                     } else {
			//                         match = false
			//                         break;
			//                     }
			//                 }
			//             }
			//         }
			//     })
			//     return match
			// })
		}
		const selectContact = async (id: any) => {
			if (onSelect) onSelect()
			contactStore.setActiveContact(id)
			chatStore.init(contactStore.activeContact)
			appStore.setLayout('chat')
		}


		const handleScroll = () => {
			let parentPos = $('#chatContactsList')[0].getBoundingClientRect()
			let childPos = $(`.contact-item-${ContactsData.length - 1}`)[0].getBoundingClientRect()
			let topOfLastContact = childPos.bottom - parentPos.bottom
			if (topOfLastContact < 0) {
				contactStore.loadContact()
				//chatStore.loadMessages(activeContact.id, chatStore.activeChatPageNumber + 1)
			}
		}

		if (!appStore.loaded) {
			return <div className="loading">
				<HashLoader color='#3498db' size={50} />
			</div>
		}


		return (
			<div className={`menu_list ${filterSwitch ? 'active' : ''}`} >
				<div className="tab-content">
					<div className="tab-pane active" id="chats-content">
						<div className="scroller d-flex flex-column h-100">
							<div onScroll={() => handleScroll()} className="hide-scrollbar h-100" id="chatContactsList">
								<ul
									className="contacts-list"
									id="chatContactTab"
									data-chat-list=""
								>
									{ContactsData.map((contact: any, index: number) => {
										if (!contact) return null
										const last_message = contact.last_message
										let online = contact.online
										let user, status: any
										if (last_message) {
											user = contact.user.find((id: any) => id === last_message.from)
											status = contact.status
										}
										let unreadedCount = 0
										if (user && hero.id === user.id) user = undefined
										if (status === 'unread') unreadedCount = chatStore.getUnreadCount(contact.id)

										return (
											<li onClick={() => selectContact(contact.id)}
												className={`contacts-item friends contact-item-${index}
                                                    ${activeContact && activeContact.id === contact.id
														? 'active' : ''}`}
												key={index}
											>
												<div className="avatar">
													<div className={`social_media_icon ${contact.social_media}`}>
														<Icon className='icon_s'
															name={`social_media_${contact.last_message.social_media}`} />
													</div>
													<Badge
														className={`online_dot ${activeContact && activeContact.id === contact.id ? 'active' : ''}`}
														dot={Boolean(online)}>
														<img src={contact.avatar} alt="" />
													</Badge>
												</div>
												<div className="contacts-content">
													<div className="contacts-info">
														<h4 className="chat-name user_name_to">{contact.name}</h4>
														<div className="chat-time">
															{
																last_message ? (<Fragment>
																	<span>{last_message.date} {last_message.time}</span>
																</Fragment>) : (<Fragment></Fragment>)
															}

														</div>
													</div>
													<div className="contacts-texts">
														{
															last_message ? (<Fragment>
																<div className={`last_msg ${status}`}>
																	<div className="from">
																		{contact.last_message.income ? '' : 'You:'}
																	</div>
																	{last_message.content}
																	{
																		status === 'unread' ? (<Fragment>
																			<div className="unreaded_count">

																			</div>
																			<div

																				className="badge badge-rounded badge-primary ml-1">
																				{unreadedCount}
																			</div>
																		</Fragment>) : (<Fragment></Fragment>)
																	}
																</div>
															</Fragment>) : (<Fragment>
																<div className={`last_msg ${status}`}>
																	*Добавлен в контакты*
																</div>
															</Fragment>)
														}
													</div>
												</div>
											</li>
										)

									})}
									{
										ContactsData && !ContactsData.length ? (<Fragment>
											<li className={`contacts-item friends`}>
												<div className="announcement">
													Контактов нет ¯\_(ツ)_/¯
												</div>
											</li>
										</Fragment>) : (<Fragment></Fragment>)
									}

									{/*{*/}
									{/*	contactStore.contactLoading ? (<Fragment>*/}
									{/*		<li className={`contacts-item friends loading`}>*/}
									{/*			<HashLoader color='#3498db' size={30}/>*/}
									{/*		</li>*/}
									{/*	</Fragment>) : (<Fragment></Fragment>)*/}
									{/*}*/}
								</ul>
							</div>
						</div>
					</div>
				</div>

			</div >
		)
	}))

export default ContactList
