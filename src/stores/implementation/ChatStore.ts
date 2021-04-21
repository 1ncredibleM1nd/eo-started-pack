import {action, observable, reaction} from 'mobx'
import {IChat, IChatStore, IMsg} from '@stores/interface'
import {appStore, contactStore, userStore} from '@stores/implementation'
import {getMessages, sendMessage} from '@actions'
import moment from 'moment'
import 'moment/locale/ru'
import $ from 'jquery'

moment.locale('ru')

export class ChatStore implements IChatStore {
	chat: IChat[] = []
	@observable loaded: boolean = false
	@observable activeChat: IChat
	@observable activeMsg: IMsg
	@observable modalWindow: string = 'close'
	activeChatPageNumber: number = 1
	@observable pageLoading: boolean = false
	updateMessages: (contact_id: string) => any
	readAllMsg: (id: string) => void
	changeSocial: (social: string) => void

	constructor() {
		reaction(() => {
			return this.chat
		}, () => {})
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
	getPageNumber() {
		return this.activeChatPageNumber
	}

	@action
	setPageLoading(pageLoading: boolean) {
		this.pageLoading = pageLoading
	}

	@action
	async sendMessage(message: string, conversationSourceAccountId: any, school: any, files: any) {
		await sendMessage(this.activeChat.id, message, conversationSourceAccountId, school, files)
	}

	@action
	async loadMessages(contact_id: string, pageNum?: number) {
		if (this.pageLoading) {
			return null
		}

		let messages: IMsg[][] = []
		this.setPageLoading(true)

		// загружаем пачки сообщений постранично
		for (let i = 1; i <= pageNum; i++) {
			const pageArray: IMsg[] = []

			let message_list = await getMessages(contact_id, i, appStore.school)

			if (message_list.length === 0) {
				break
			}

			// обработка пачки сообщений
			for (let j = 0; j < message_list.length; j++) {
				const message = this.collectMessage({
					previous: message_list[j - 1],
					current: message_list[j],
					next: message_list[j + 1]
				}, contact_id)

				pageArray.unshift(message)
			}

			messages.unshift(pageArray)
		}

		// если находимся в чате
		if (this.activeChat && this.activeChat.msg) {
			this.activeChat.setMessages(messages)

			if (document.querySelector(`.page-${ this.getPageNumber() }`)) {
				if (this.activeChat.msg[0].length > 29) {
					setTimeout(() => {
						$('.msg_space').animate({ scrollTop: $(`.page-1`).height() }, 0)
					})
				}

				this.addPageNumber()
			}

			this.setPageLoading(false)
		} else {
			this.setPageLoading(false)

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
		let chat = this.getChat_contactId(id)

		return chat.msg[chat.msg.length - 1]
	}

	@action
	getUnreadCount(id: string): number {
		let unreadedCount = 0
		let chat = this.getChat_contactId(id)
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
			let avatar = userStore.hero.avatar
			let time = moment().format('HH:mm');
			let date = moment().format('DD.MM');
			let firstPage = this.activeChat.msg[0]
			let prevMsg = firstPage[firstPage.length - 1]

			let flowMsgNext = false
			let flowMsgPrev = false
			let center = false

			let time_scope: any = null

			let currentTime = moment(time, 'HH:mm')
			let prevTime = moment(prevMsg.time, 'HH:mm')
			let prevTimeDiff = currentTime.diff(prevTime, 'minutes')

			if (prevMsg && prevMsg.date !== date) {
				time_scope = prevMsg.date
			} else {
				time_scope = null
			}

			if (prevTimeDiff < 3) {
				prevMsg.flowMsgNext = true
				flowMsgPrev = true
			}

			let msg: IMsg = {
				flowMsgNext,
				flowMsgPrev,
				center,
				time,
				date,
				time_scope,
				id: `msg_${id}`,
				avatar: avatar,
				from: from,
				social_media: social_media,
				content: content,
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
			setTimeout(() => {
				$('.msg_space').animate({ scrollTop: $('.msg_space').prop('scrollHeight') }, 0)
			})
		}
	}

	@action
	deleteMsg(id: string, chat_id: string) {
		for (let i = 0; i < this.chat.length; i++) {
			let chat = this.chat[i]

			if (chat.id === chat_id) {
				chat.msg = chat.msg.filter((msg: any) => msg.id !== id)
			}

			this.chat[i] = chat
		}
	}

	@action
	setActiveMsg(message: IMsg, chat_id: string) {
		let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)

		if (message) {
			this.activeMsg = message
			chat.setActiveMsg(message)
		} else {
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

	async setActiveChat(contact: any) {
		if (!!contact) {
			this.activeChat = await this.collectChat(contact)

			let lastMessage: IMsg = this.activeChat.msg[0][this.activeChat.msg[0].length - 1]
			if (lastMessage.income) {
				this.setActiveMsg(lastMessage)
			}

			setTimeout(() => {
				$('.msg_space').animate({ scrollTop: $('.msg_space').prop('scrollHeight') }, 0)
			})
		} else {
			this.activeChat = null
		}

		this.loaded = true
	}

	async collectChat(contact: any) {
		const chat: IChat = {
			contact_id: contact.id,
			id: contact.id,
			activeSocial: contact.last_message.social_media,
			role: [],
			msg: [],
			user: contact.user,
			active_msg: null,
			setActiveMsg(message: IMsg) {
				this.active_msg = message
			},
			changeSocial(social: any) {
				this.activeSocial = social
			},
			setMessages(messages: IMsg[][]) {
				this.msg = messages
			}
		}

		const messageList = await this.loadMessages(contact.id, 1)

		chat.setMessages(messageList)

		return chat
	}

	collectMessage(message: any, contact_id: string) {
		let avatar = message.current.income ?
			contactStore.getAvatar(contact_id) :
			userStore.hero.avatar
		let userId = message.current.from
		let previousMessage, nextMessage: any
		let previousTimeDifference, nextTimeDifference: any
		let flowMessageNext = false
		let flowMessagePrevious = false
		let center = false
		let previousRead, timeScope: any
		let username: string
		let type = 'message'

		if (contactStore.activeContact.user.find((u: any) => u == message.current.from)) {
			username = contactStore.activeContact.name
		}

		if (message.previous) {
			previousMessage = message.previous
			previousRead = previousMessage.readed
			let currentTime = moment(message.current.time, 'HH:mm')
			let prevTime = moment(previousMessage.time, 'HH:mm')
			previousTimeDifference = prevTime.diff(currentTime, 'minutes')
		}

		if (message.next) {
			nextMessage = message.next
			let currentTime = moment(message.next.time, 'HH:mm')
			let nextTime = moment(nextMessage.time, 'HH:mm')
			nextTimeDifference = currentTime.diff(nextTime, 'minutes')
		}

		if (
			previousMessage &&
			previousMessage.date !== message.current.date
		) {
			timeScope = message.current.date
		} else {
			timeScope = null
		}

		if (
			previousMessage &&
			previousMessage.income === message.current.income &&
			previousMessage.from === userId &&
			previousTimeDifference < 3
		) {
			flowMessageNext = true
		}

		if (
			nextMessage &&
			nextMessage.income === message.current.income &&
			nextMessage.from === userId &&
			nextTimeDifference < 3
		) {
			flowMessagePrevious = true
		}

		if (flowMessageNext && flowMessagePrevious) {
			center = true
		}

		return {
			timeScope,
			previousRead,
			flowMessageNext,
			flowMessagePrevious,
			center,
			avatar,
			username,
			type,
			...message.current,
			readMsg() {
				this.readed = true
			},
			addSmile(smile: any) {
				this.smiles.push(smile)
			},
			editMsg(msg: string) {
				this.content = msg
				this.editted = true
			}
		}
	}
}

export const chatStore = new ChatStore()
