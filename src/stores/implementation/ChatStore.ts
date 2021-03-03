import {action, observable, reaction} from 'mobx'
import {IChat, IChatStore, IMsg} from '@stores/interface'
import {contactStore, appStore} from '@stores/implementation'
import {getMessages} from '@actions'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')
import {sendMsg} from '@actions'
import $ from 'jquery'


export class ChatStore implements IChatStore {
	chat: IChat[] = []
	@observable loaded: boolean = false
	@observable activeChat: IChat
	@observable activeMsg: IMsg
	@observable modalWindow: string = 'close'
	activeChatPageNumber: number = 1
	pageLoading: boolean = false
	updateMessages: (contact_id: string) => any
	readAllMsg: (id: string) => void
	changeSocial: (social: string) => void
	
	constructor() {
		reaction(() => {
			return this.chat
		}, () => {
			if (true) {
			}
		})
	}
	
	@action
	addPageNumber() {
		this.activeChatPageNumber += 1
	}
	
	@action
	setPageNumber(number: number) {
		this.activeChatPageNumber = number
	}
	
	@action
	setActiveChat(chat: any) {
		//Используется для деактивации, сетится чат в Init внизу
		this.activeChat = chat
	}
	
	
	@action
	async sendMessage(message: string, conversationSourceAccountId: any, school: string) {
		await sendMsg(this.activeChat.id, message, conversationSourceAccountId, school)
	}
	
	@action
	async sendMessageFile(files: any, conversationSourceAccountId: any, school: string) {
		const formData = new FormData()
		for (let i = 0; i < files.length; i++) {
			formData.append(`files[]`, files[0], files[0].name)
		}
		formData.append('message', 'undefinded')
		formData.append('conversationSourceAccountId', conversationSourceAccountId)
		if (school) {
			formData.append('schoolId', school)
		}
		formData.append('conversationId', this.activeChat.id)
		$.ajax({
			url: 'https://8c6870338a21.ngrok.io/v1/conversation/send-message',
			// headers: {
			// 	'Authorization': `Bearer ${localStorage.getItem('token')}`
			// },
			type: 'POST',
			async: false,
			dataType: 'multipart',
			// xhrFields: {
			// 	withCredentials: true
			// },
			cache: false,
			contentType: false,
			processData: false,
			data: formData
		})
		
		//await sendMsgFile(formData)
	}
	
	
	@action
	async loadMessages(contact_id: string, pageNum?: number) {
		if (this.pageLoading) return null
		let messages: IMsg[][] = []
		this.pageLoading = true
		
		for (let i = 1; i <= pageNum; i++) {
			const pageArray: IMsg[] = []
			let pageContent = await getMessages(contact_id, i, appStore.school)
			if (pageContent.messages.length === 0) break
			
			await pageContent.messages.forEach((msg_item: any, index: number) => {
				let avatar = contactStore.getAvatar(contact_id)
				// let role = chat.role.find((role: any) => role.id === msg.from)
				let userId = msg_item.from
				let prevMsg, nextMsg: any
				let prevTimeDiff, nextTimeDiff: any
				let flowMsgNext = false
				let flowMsgPrev = false
				let center = false
				let prevRead, time_scope: any = null
				let username: string
				let type = 'message'
				
				if (contactStore.activeContact.user.find((u: any) => u == msg_item.from)) {
					username = contactStore.activeContact.name
				}
				
				
				if (pageContent.messages[index - 1]) {
					prevMsg = pageContent.messages[index - 1]
					prevRead = prevMsg.readed
					let currentTime = moment(msg_item.time, 'HH:mm')
					let prevTime = moment(prevMsg.time, 'HH:mm')
					prevTimeDiff = prevTime.diff(currentTime, 'minutes')
				}
				
				if (pageContent.messages[index + 1]) {
					nextMsg = pageContent.messages[index + 1]
					let currentTime = moment(msg_item.time, 'HH:mm')
					let nextTime = moment(nextMsg.time, 'HH:mm')
					nextTimeDiff = currentTime.diff(nextTime, 'minutes')
				}
				
				if (prevMsg && prevMsg.date !== msg_item.date) {
					time_scope = msg_item.date
				} else {
					time_scope = null
				}
				
				if (prevMsg && prevMsg.income === msg_item.income && prevMsg.from === userId && prevTimeDiff < 3) flowMsgNext = true
				if (nextMsg && nextMsg.income === msg_item.income && nextMsg.from === userId && nextTimeDiff < 3) flowMsgPrev = true
				if (flowMsgNext && flowMsgPrev) center = true
				
				const msg = {
					time_scope,
					prevRead,
					flowMsgNext,
					flowMsgPrev,
					center,
					avatar,
					username,
					type,
					...msg_item,
					readMsg() {
						this.readed = true
					},
					addSmile(smile: any) {
						this.smiles.push(smile)
					},
					editMsg(value: string) {
						this.content = value
						this.editted = true
					}
				}
				//console.log(msg.content, msg)
				pageArray.unshift(msg)
			})
			messages.unshift(pageArray)
		}
		
		if (this.activeChat && this.activeChat.msg) {
			this.activeChat.msg = messages
			localStorage.setItem(contact_id + '_chat', JSON.stringify(this.activeChat))
			
			if ($(`.page-${this.activeChatPageNumber}`)) {
				console.log('Длинна последней страницы', this.activeChat.msg[0].length)
				if (this.activeChat.msg[0].length > 29) {
					$('.msg_space').animate({scrollTop: $(`.page-1`).height() + 500}, 0)
				}
				
				setTimeout(() => {
					this.pageLoading = false
					this.addPageNumber()
				}, 500)
			}
		
		} else {
			this.pageLoading = false
			return messages
		}
		
		return null
	}
	
	
	@action
	getMsg(id: string, chat_id: string): IMsg {
		let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)
		for (let i = chat.msg.length; i >= 0; i--) {
			let page = chat.msg[i]
			return page.find((msg: IMsg) => msg.id === id)
		}
		return null
	}
	
	
	@action
	getChat_contactId(contact_id: string): IChat {
		return this.chat.find((chat_item: IChat) => chat_item.contact_id === contact_id)
	}
	
	@action
	getChat(id: string): IChat {
		return this.chat.find((chat_item: IChat) => chat_item.id === id)
	}
	
	@action
	setModalWindow(status: string) {
		this.modalWindow = status
	}
	
	@action
	getLastMsg(id: string): any {
		let chat = this.chat.find((chat_item: IChat) => chat_item.contact_id === id)
		return chat.msg[chat.msg.length - 1]
	}
	
	@action
	getUnreadCount(id: string): number {
		let unreadedCount = 0
		let chat = this.chat.find((chat_item: IChat) => chat_item.contact_id === id)
		let counting = true
		for (let i = chat.msg.length; i >= 0; i--) {
			let page = chat.msg[i]
			
			if (!counting) break
			
			for (let index = page.length; index >= 0; index--) {
				const msg = page[index]
				if (!msg.read) {
					unreadedCount += 1
				} else {
					counting = false
				}
			}
		}
		
		return unreadedCount
	}
	
	@action
	async addMsg(content: any, from: any, social_media: string, reply: any) {
		if (this.activeChat) {
			let id = 'msg_' + Math.random()
			contactStore.setLastMsg(this.activeChat.contact_id, `msg_${id}`)
			let avatar = contactStore.getAvatar(this.activeChat.contact_id)
			
			let msg: IMsg = {
				id: `msg_${id}`,
				avatar: avatar,
				from: from,
				social_media: social_media,
				content: content,
				time: moment().format('HH:mm'),
				date: moment().format('DD.MM'),
				read: false,
				smiles: [],
				reply: reply,
				edited: false,
				income: false,
				readMsg() {
					this.read = true
				},
				addSmile(smile) {
					this.smiles.push(smile)
				},
				editMsg(value: string) {
					this.content = value
					this.edited = true
				}
			}
			this.activeChat.msg[0].push(msg)
			$('.msg_space').animate({scrollTop: $('.msg_space').prop('scrollHeight')}, 0)
			setTimeout(() => $('.msg_space').animate({scrollTop: $('.msg_space').prop('scrollHeight')}, 0), 100)
		}
	}
	
	
	@action
	deleteMsg(id: string, chat_id: string) {
		for (let index = 0; index < this.chat.length; index++) {
			let chat = this.chat[index]
			
			if (chat.id === chat_id) {
				chat.msg = chat.msg.filter((msg: any) => msg.id !== id)
			}
			this.chat[index] = chat
		}
	}
	
	@action
	setActiveMsg(msg: IMsg, chat_id: string) {
		if (msg) {
			let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)
			this.activeMsg = msg
			chat.setActiveMsg(msg)
			
		} else {
			let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)
			this.activeMsg = null
			chat.setActiveMsg(null)
		}
	}
	
	// @action
	// readAllMsg(chat_id: string) {
	//     let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)
	//     for (let i = chat.msg.length; i > 0; i--) {
	//         const msg = chat.msg[i - 1];
	//         if (msg.readed) {
	//             break;
	//         } else {
	//             msg.read()
	//         }
	//     }
	//     contactStore.setStatus(chat.contact_id, 'readed')
	// }
	
	
	@action
	async init(activeContact: any): Promise<any> {
		if (activeContact) {
			let messages: any
			if (localStorage.getItem(activeContact.id + '_chat')) {
				let localChat = await JSON.parse(localStorage.getItem(activeContact.id + '_chat'))
				if (!localChat.msg || localChat.msg[0][localChat.msg[0].length - 1].id !== activeContact.last_message.id) {
					await localStorage.removeItem(activeContact.id + '_chat')
					return this.init(activeContact)
				}
				this.activeChat = localChat
				this.loaded = true
				$('.msg_space').animate({scrollTop: $('.msg_space').prop('scrollHeight')}, 0)
			} else {
				if (this.activeChat && this.activeChat.msg) {
					messages = this.activeChat.msg
				} else {
					messages = await this.loadMessages(activeContact.id, 1)
				}
				let chat: any = {
					contact_id: activeContact.id,
					id: activeContact.id,
					activeSocial: activeContact.last_message.social_media,
					role: [],
					user: activeContact.user,
					msg: messages,
					active_msg: null,
					setActiveMsg(msg: IMsg) {
						this.active_msg = msg
					},
					changeSocial(social: any) {
						this.activeSocial = social
					}
				}
				if (JSON.stringify(this.activeChat) !== JSON.stringify(chat)) {
					this.loaded = true
					this.activeChat = chat
					localStorage.setItem(activeContact.id + '_chat', JSON.stringify(chat))
				}
			}
		}
	}
	
	
}

export const chatStore = new ChatStore()
