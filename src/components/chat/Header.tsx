import React, { Fragment } from 'react'
import ModalWindow from './ModalWindow'
import { inject, observer } from 'mobx-react'
import IStores, { IChatStore, IContactStore, IUserStore, IAppStore } from '@stores/interface'
import { Button } from 'antd'

import './Header.scss'
import { Icon } from '@ui'
import MoonLoader from 'react-spinners/MoonLoader'



type IProps = {
	chatStore?: IChatStore,
	userStore?: IUserStore,
	contactStore?: IContactStore
	appStore?: IAppStore
}

const Header = inject((stores: IStores) => ({
	appStore: stores.appStore,
	chatStore: stores.chatStore,
	userStore: stores.userStore,
	contactStore: stores.contactStore
}))(
	observer((props: IProps) => {
		const { chatStore, contactStore, appStore } = props
		const activeContact = contactStore.activeContact
		let chatTitle: any
		let activeMsg: any

		if (activeContact) chatTitle = activeContact.name
		// const [modal, setModal] = useState(false)
		// let hero = userStore.hero
		// const onDelete = () => {
		// 	chatStore.deleteMsg(activeMsg.id, chat.id)
		// 	chat.setActiveMsg(null)
		// }

		// const onClose = () => {
		// 	chat.setActiveMsg(null)
		// }


		// const openProfile = (type: string) => {
		// 	chatStore.setModalWindow(type)
		// 	// setModal(false)
		// }

		// const editContact = () => {

		// }

		// const deleteContact = () => {

		// }

		// const deleteChat = () => {

		// }

		// const clearHistory = () => {

		// }

		// const blockUser = () => {

		// }

		// const deleteExit = () => {

		// }


		// const DropDownMenu = (msg: any) => {
		// 	if (user) {
		// 		return (
		// 			<Menu>
		// 				<Menu.Item onClick={() => openProfile('user')}>
		// 					Профиль
		// 				</Menu.Item>
		// 				<Menu.Item onClick={() => editContact()}>
		// 					Редакт. Контакт
		// 				</Menu.Item>
		// 				<Menu.Item onClick={() => deleteContact()}>
		// 					Удалить Контакт
		// 				</Menu.Item>
		// 				<Menu.Item onClick={() => deleteChat()}>
		// 					Удалить чат
		// 				</Menu.Item>
		// 				<Menu.Item onClick={() => clearHistory()}>
		// 					Очистить историю
		// 				</Menu.Item>
		// 				<Menu.Item onClick={() => blockUser()}>
		// 					Заблокировать
		// 				</Menu.Item>
		// 				{/* <Menu.Item onClick={() => replyMsg(msg.id)} >
		// 				 Экспортировать чат
		// 				 </Menu.Item> */}
		// 			</Menu>
		// 		)
		// 	} else {
		// 		return (
		// 			<Menu>
		// 				<Menu.Item onClick={() => openProfile('group')}>
		// 					Настройки группы
		// 				</Menu.Item>
		// 				<Menu.Item onClick={() => deleteExit()}>
		// 					Удалить и выйти
		// 				</Menu.Item>
		// 				<Menu.Item onClick={() => deleteChat()}>
		// 					Удалить чат
		// 				</Menu.Item>
		// 				<Menu.Item onClick={() => clearHistory()}>
		// 					Очистить историю
		// 				</Menu.Item>
		// 				{/* <Menu.Item onClick={() => replyMsg(msg.id)} >
		// 				 Экспортировать чат
		// 				 </Menu.Item> */}
		// 			</Menu>
		// 		)
		// 	}
		// }


		const closeConctact = () => {
			if (appStore.layout === 'contact') {
				appStore.setLayout('info')
			} else if (appStore.layout === 'info') {
				appStore.setLayout('contact')
			} else if (appStore.layout === 'chat') {
				appStore.setLayout('contact')
			}
		}

		return (
			<div className="chat_header">
				{
					activeMsg ? (<Fragment>

						{/* <div className="header_content select">
							<div className="left">
								<div onClick={() => setModal(true)} className="header_select_btn">
									Переслать
								</div>
								<div onClick={() => onDelete()} className="header_select_btn">
									Удалить
								</div>
							</div>
							<div className="right">
								<div onClick={() => onClose()} className="header_select_btn cancel">
									Отменить
								</div>
							</div>
						</div> */}

					</Fragment>) : (<Fragment>
						{
							chatTitle ? (<Fragment>
								<div className="header_content">
									<div className={`back_trigger ${appStore.layout !== 'contact' ? 'active' : ''}`}>
										<Button onClick={() => closeConctact()} className='transparent'>
											<Icon className='icon_s blue-lite' name={`solid_arrow-left`} />
										</Button>
									</div>
									<div className={`header_title`}>
										<div className='title'>
											<p>{chatTitle}</p>
										</div>
										{/*{*/}
										{/*    user ? (<Fragment>*/}
										{/*        <div className="social-online">*/}
										{/*            {*/}
										{/*                Object.keys(user.online).map(function (key, index) {*/}
										{/*                    return (*/}
										{/*                        <div className="online_item"*/}
										{/*                             key={index}*/}
										{/*                        >*/}
										{/*                            <Icon className='icon_s active-grey'*/}
										{/*                                  name={`social_media_${key}`}/>*/}
										{/*                            <span>*/}
										{/*                                {*/}
										{/*                                    user.online[key] === 'В сети' ? (<Fragment>*/}
										{/*                                        <div*/}
										{/*                                            className="online_dot_header"></div>*/}
										{/*                                    </Fragment>) : (*/}
										{/*                                        <Fragment>{user.online[key]}</Fragment>)*/}
										{/*                                }*/}
										{/*                            </span>*/}
										{/*                        </div>*/}
										{/*                    )*/}
										{/*                })*/}
										{/*            }*/}
										{/*        </div>*/}
										{/*    </Fragment>) : (<Fragment></Fragment>)*/}
										{/*}*/}
										<div className="header_settings">
											<div className="trigger">
												{/* <Popover onVisibleChange={(e) => {
													e ? {} : setModal(false)
												}} visible={modal} content={<DropDownMenu/>} trigger="click">
													<Button onClick={() => setModal(!modal)} className='transparent'>
			                    <Icon className='icon_s lite-grey rotated' name={`regular_three-dots`} />
													</Button>
												</Popover> */}
												{
													chatStore.pageLoading ? (<Fragment>
														<MoonLoader color='#3498db' size={18} />
													</Fragment>) : (<Fragment></Fragment>)
												}

											</div>
										</div>
									</div>
									<div className="header_info">
										<Button onClick={() => appStore.setLayout('info')} className='transparent'>
											<Icon className='icon_l lite-grey' name={`solid_users-cog`} />
										</Button>
									</div>
								</div>
							</Fragment>) : (<Fragment>

							</Fragment>)
						}
					</Fragment>)
				}
				<ModalWindow />
			</div>
		)
	}))

export default Header
