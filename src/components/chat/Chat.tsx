import React, { useState, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import IStores, { IChatStore, IMsg, IContactStore, IUserStore } from '@stores/interface'
import { Icon } from '@ui'
import moment from 'moment'
// @ts-ignore
import { Menu, Dropdown, Divider } from 'antd'
// import SmileMenu from './comp/SmileMenu'
import './Chat.scss'
import Inputer from './comp/Inputer'
import PuffLoader from 'react-spinners/PuffLoader'
import ChatPlaceholder from './comp/ChatPlaceholder'
import $ from 'jquery'
import SettingsMo from '@components/chat/comp/SettingsMo'
import {TypesMessage} from "@stores/classes";
import {MoreOutlined} from "@ant-design/icons";


type IProps = {
	chatStore?: IChatStore,
	contactStore?: IContactStore,
	userStore?: IUserStore
}

const Chat = inject((stores: IStores) => ({
	chatStore: stores.chatStore,
	contactStore: stores.contactStore,
	userStore: stores.userStore
}))(
	observer((props: IProps) => {
		const { chatStore, contactStore } = props
		const activeContact = contactStore.activeContact
		// const [draft, setDraft] = useState({})
		const [switcher, setSwitcher] = useState('')
		// const [status, setStatus] = useState('default')
		const [reRender, setReRender] = useState(false)
		const [isOpenMenu, setIsOpenMnu] = useState(false)
		let currentChat: any
		let last_date: any = null

		if (chatStore.chat && activeContact) {
			currentChat = chatStore.activeChat
		}

		// const editMsg = (id: string) => {
		// 	let msg = chatStore.getMsg(id, currentChat.id)
		// 	chatStore.setActiveMsg(msg, currentChat.id)
		// 	setDraft({...draft, [activeContact.id + 'edit']: msg.content})
		// 	setStatus('edit')
		// }
		// const deleteMsg = (id: string) => {
		// 	chatStore.deleteMsg(id, currentChat.id)
		// 	setReRender(!reRender)
		// }
		// const selectMsg = (id: string) => {
		// 	let msg = chatStore.getMsg(id, currentChat.id)
		// 	chatStore.setActiveMsg(msg, currentChat.id)
		// 	setDraft({...draft, [activeContact.id + 'reply']: draft[activeContact.id + status]})
		// 	setStatus('reply')
		// }


		const replyMsg = (msg: any) => {
			chatStore.setActiveMsg(msg)

			setReRender(!reRender)
		}

		const DropDownMenu = (msg: any) => {
			return (
				<Menu>
					{/*<Menu.Item onClick={() => editMsg(msg.id)}>*/}
					{/*	Редактировать*/}
					{/*</Menu.Item>*/}
					{/*<Menu.Item onClick={() => selectMsg(msg.id)}>*/}
					{/*	Выбрать*/}
					{/*</Menu.Item>*/}
					{/*<Menu.Item onClick={() => deleteMsg(msg.id)}>*/}
					{/*	Удалить*/}
					{/*</Menu.Item>*/}
					<Menu.Item onClick={() => replyMsg(msg)}>
						Ответить
					</Menu.Item>
				</Menu>
			)
		}

		const switcherOff = () => {
			setSwitcher('')
		}

		const handleScroll = () => {
			let parentPos = $('.msg_space')[0].getBoundingClientRect()
			let childPos = $(`.page-1`)[0].getBoundingClientRect()
			let topOfLastPage = childPos.top - parentPos.top
			if (topOfLastPage >= -300) {
				chatStore.loadMessages(activeContact.id, chatStore.getPageNumber() + 1)
			}

			if (switcher !== 'social') {
				switcherOff()
			}
		}

		if (!currentChat) {
			return (
				<div className="chat">
					<ChatPlaceholder />
				</div>
			)
		}

		const openHelperMenu = () => setIsOpenMnu(!isOpenMenu)

		if (currentChat && !currentChat.msg && activeContact) {
			chatStore.loadMessages(activeContact.id, null)

			return (
				<div className="chat">
					<div className="loading chat_loading">
						<PuffLoader color='#3498db' size={50} />
					</div>
				</div>
			)
		}

		//render chat content
		const renderDataTimeBlock = (time: string) => <div className="date_container">
			<Divider orientation="center"
				className='date_divider'>
				<div className="date">
					{time}
				</div>
			</Divider>
		</div>
		const renderDataContainerUnread = () => <div className="date_container unread">
			<Divider orientation="center"
				className='date_divider unread'>
				<div className="date unread">
					Непрочитанные сообщения
				</div>
			</Divider>
		</div>

		const renderMessagesWrapper = (msg: any) => <div className="message-wrapper">
			<div className={`message-content ${msg.combineWithPrevious ? 'not-main' : ''} `}>
				{!!msg.reply ? (<div className="reply">
					<span>
						{msg.reply.content}
					</span>
					<div className="msg_type">
						{TypesMessage.getTypeDescription(msg.entity.type)}
					</div>
				</div>) : ''}
				<div className="inset_border_container">
					<div className="dummy" />
					<div className="border_hero" />
				</div>
				<div className='msg_text_container'>
					{
						msg.attachments.length !== 0 ? (
							<div className="msg_file_container">
								{
									msg.attachments.map((attachment: any, index: any) => {
										if (attachment.type === 'photo') {
											return (
												<div className={`msg_content-image ${'image_count_' + index}`}>
													<img src={attachment.url} alt="" />
												</div>
											)
										} else if (attachment.type === 'document') {
											return (
												<div className="msg_content-document">
													Document
												</div>
											)
										} else if (attachment.type === 'audio') {
											return (
												<div className="msg_content-audio">
													Audio
												</div>
											)
										} else if (attachment.type === 'video') {
											return (
												<div className="msg_content-video">
													Video
												</div>
											)
										}

										return null
									})
								}
							</div>
						) : (<Fragment></Fragment>)
					}
					<Fragment>
						{ msg.content }
					</Fragment>
				</div>
				<div className='msg_time'>
					{msg.time}
				</div>
				<div className='msg_menu'>
					<Dropdown overlay={ DropDownMenu(msg) } placement="bottomLeft" trigger={['click']}>
				    	<MoreOutlined className="dropdown-trigger" />
					</Dropdown>
				</div>
				{/* <div className={`smile ${switcher === msg.id ? 'active' : ''}`}>
				 <Popover onVisibleChange={(e) => { e ? {} : setSwitcher('') }} visible={switcher === msg.id} content={<SmileMenu id={msg.id} chat_id={currentChat.id} switcherOff={switcherOff} /trigger="click">
				 <Button onClick={() => { switcher === msg.id ? setSwitcher('') : setSwitcher(msg.id) }} className='transparent'>
				 <Icon className={`icon_s active-grey`} name='regular_smile' />
				 </Button>
				 </Popover>
				 </div> */}
				{/* <div className="smile_realization">
				 {
				 msg.smiles && msg.smiles.length ? (<Fragment>
				 {
				 msg.smiles.map((smile: string) => {
				 return (
				 <div className="smile_msg">
				 {smile}
				 </div>
				 )
				 })
				 }
				 </Fragment>) : (<Fragment></Fragment>)
				 }
				 </div> */}
			</div>
		</div>

		const renderMessagesOptions = (msg: any) => !msg.combineWithPrevious ? (<div className="message-options">
			<div className="avatar avatar-sm">
				<div className={`social_media_icon ${msg.social_media}`}>
					<Icon className='icon_s' name={`social_media_${msg.social_media}`} />
				</div>
				<img src={msg.avatar} alt="" />
			</div>
			<span className="message-status">{msg.editted ? (
				<div className="editted_icon"><Icon className='active-grey' name={`solid_pencil-alt`} />{' '}Редак.
				</div>) : ''}
				<div className="msg_username">{msg.username}</div>
				<div className="msg_time">{msg.time} {msg.date}</div>
				<div className="msg_type">
					{TypesMessage.getTypeDescription(msg.entity.type)}
				</div>
			</span>
		</div>) : ''

		//index rendering functions
		const renderToMeMessages = (msg: any) => {
			return (<>
				{dateDivider(msg)}
				{!msg.readed ? renderDataContainerUnread() : ' '}
				<div key={Math.random()} className={`message ${msg.combineWithPrevious ? 'not-main' : ''} `}>
					{renderMessagesWrapper(msg)}
					{renderMessagesOptions(msg)}
				</div>
			</>)
		}

		let dateDivider = (msg: any) => {
			let diff: any
			let currentDate = moment(msg.date, 'DD.MM')
			if (last_date) diff = currentDate.diff(last_date, 'days')
			last_date = moment(msg.date, 'DD.MM')
			if (diff > 0) return renderDataTimeBlock(currentDate.format('DD.MM'))
			return null
		}

		const renderMyMessages = (msg: any) => {
			return (<>
				{dateDivider(msg)}
				<div key={Math.random()} className={`message self ${msg.combineWithPrevious ? 'not-main' : ''} `}>
					{renderMessagesWrapper(msg)}
					{renderMessagesOptions(msg)}
				</div>
			</>)
		}

		return (<div className="chat position-relative">
			{currentChat !== undefined ? (<>
				<div onScroll={() => handleScroll()} className="msg_space" id={activeContact.id}>
					{currentChat.msg.map((page: IMsg[], index: number) => <div className={`page page-${index + 1}`}>
						{page.map((msg: IMsg) => msg.income ? renderToMeMessages(msg) : renderMyMessages(msg))}
					</div>)}
				</div>
				{isOpenMenu ? <div className="message-item">
					<div className="message-block-content d-flex flex-column justify-content-between">
						<SettingsMo />
					</div>
				</div> : ''}
				<Inputer helperMenu={openHelperMenu} />
			</>)
				: (<ChatPlaceholder />)}
		</div>)
	}))

export default Chat
