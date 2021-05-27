import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import IStores, { IAppStore, IChatStore, IContactStore, IUserStore } from '@stores/interface'
import { Badge } from 'antd'
import HashLoader from 'react-spinners/HashLoader'
import './ContactList.scss'
import './Contact.scss'
import { Icon } from '@ui'
import moment from 'moment'

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
		const filterSwitch = contactStore.filterSwitch

		const selectContact = async (id: any) => {
			if (onSelect) {
				onSelect()
			}

			if (chatStore.activeChat) {
				chatStore.setActiveMessage(null)
			}

			await contactStore.setActiveContact(id)

			appStore.setLayout('chat')
		}

		const handleScroll = () => {
		    if(!document.querySelector('#chatContactsList') || document.querySelector(`.contact-item-${ContactsData.length - 1}`)){
		        return;
            }
			let parentPos = document.querySelector('#chatContactsList').getBoundingClientRect()
			let childPos = document.querySelector(`.contact-item-${ContactsData.length - 1}`).getBoundingClientRect()
			let topOfLastContact = childPos.bottom - parentPos.bottom

			if (topOfLastContact <= 10) {
				contactStore.loadContact()
			}
		}

		if (!appStore.loaded) {
			return <div className="loading">
				<HashLoader color='#3498db' size={50} />
			</div>
		}

		const contactTime = (timestamp: any) => {
			let time: any = moment(timestamp, 'X').format('HH:mm')
			let date: any = moment(timestamp, 'X').format('DD.MM.YY')

			let now = moment(new Date())
			let contact_date = moment(date, 'DD.MM.YY')
			let diff = now.diff(contact_date, 'days')
			if (diff === 0) {
				return (
					<span>{time}</span>
				)
			} else if (diff <= 7) {
				return (
					<span>{contact_date.format('dd')}</span>
				)
			} else {
				return (
					<span>{date}</span>
				)
			}
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
										if (!contact) {
											return null
										}

										const last_message = contact.last_message
										let online = contact.online

										let status: any
										if (!!last_message) {
											status = !last_message.income || last_message.readed ?
												'read' :
												'unread'
										}

                                        const isIAm = !last_message.income &&
                                                last_message.user &&
                                                last_message.user.id === userStore.hero.id

										// let unreadedCount = 1
										// if (status === 'unread') {
										// 	unreadedCount = chatStore.getUnreadCount(contact.id)
										// }

										return (
											<li onClick={() => selectContact(contact.id)}
												className={`contacts-item friends contact-item-${index}
                                                    ${contactStore.activeContact && contactStore.activeContact.id === contact.id
														? 'active' : ''}`}
												key={index}
											>
												<div className="avatar">
													<div className={`social_media_icon white ${contact.last_message.social_media}`}>
														<Icon className='icon_s'
															name={`social_media_${contact.last_message.social_media}`} />
													</div>
													<Badge
														className={`online_dot ${contactStore.activeContact && contactStore.activeContact.id === contact.id ? 'active' : ''}`}
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
																	{contactTime(last_message.timestamp)}
																</Fragment>) : (<Fragment></Fragment>)
															}

														</div>
													</div>
													<div className="contacts-texts">
														{
															last_message ? (<Fragment>
																<div className={`last_msg ${status}`}>
                                                                    {isIAm?<div className="from">Ты:</div>:''}
																	{last_message.content}
																	{
																		status === 'unread' ? (<Fragment>
																			<div className="unreaded_count">
																				{/*{unreadedCount}*/}
																			</div>
																		</Fragment>) : (<Fragment />)
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
										</Fragment>) : (<Fragment />)
									}
								</ul>
							</div>
						</div>
					</div>
				</div>

			</div >
		)
	}))

export default ContactList
