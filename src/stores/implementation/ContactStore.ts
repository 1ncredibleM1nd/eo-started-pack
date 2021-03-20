import { action, computed, observable, reaction } from 'mobx'
import { IContactStore, IContact } from '@stores/interface'
import { chatStore, appStore } from '@stores/implementation'
import { getConversations } from '@actions'
import $ from 'jquery'

export class ContactStore implements IContactStore {
	@observable contact: IContact[] = []
	@observable activeContact: IContact
	@observable search: string = ''
	@observable filterSwitch: boolean = false
	@observable source: any = {
		'whatsapp': false,
		'instagram': false,
		'vkontakte': true,
		'odnoklassniki': true,
		'viber': false,
		'facebook': false,
		'telegram': true,
		'email': false
	}
	contactLoading: boolean = false

	constructor() {
		reaction(() => {
			return this.contact
		}, () => {})
	}
	filter: any
	name: string

	@computed
	get availableContacts() {
		return this.contact
	}

	@action
	toggleFilterSwitch() {
		this.filterSwitch = !this.filterSwitch
	}

	@action
	filterSocial(key: string) {
		this.source[key] = !this.source[key]
		this.contact = []
		appStore.setLoading(false)
		appStore.updateContact()
	}

	@action
	setSearch(search: string) {
		this.search = search
		this.contact = []
		appStore.setLoading(false)
		appStore.updateContact()
	}

	@action
	async loadContact(): Promise<any> {
		if (this.contactLoading) {
			return null
		}

		this.contactLoading = true

		let conversations = await getConversations(appStore.school, appStore.activeContactPageNumber + 1)

		let dataContact: any = []
		if (!!conversations.length) {
			for (let i = 0; i < conversations.length; i++) {
				const contact_item = conversations[i]
				const initContact: IContact = {
					...contact_item,
					setStatus(status: string) {
						this.status = status
					},
					setLastMsg(message_id: string) {
						this.last_message_id = message_id
					}
				}

				dataContact.push(initContact)
			}

			this.contact = [...this.contact, ...dataContact]

			if (conversations.length === 20) {
				setTimeout(() => {
					appStore.setContactPageNumber(appStore.activeContactPageNumber + 1)
					this.contactLoading = false
				}, 500)
			}
		} else {
			this.contactLoading = false
		}
	}

	@action
	deleteName = () => ''

	@action
	getContact(id: string) {
		return this.contact.find((contact_item: IContact) => contact_item.id === id)
	}

	@action
	setLastMsg(id: string, msg_id: string) {
		let contact = this.contact.find((contact_item: IContact) => contact_item.id === id)
		contact.setLastMsg(msg_id)
	}

	@action
	setStatus(id: string, status: string) {
		let contact = this.contact.find((contact_item: IContact) => contact_item.id === id)
		contact.setStatus(status)
	}

	@action
	setActiveContact(id: string) {
		if (id === null) {
			chatStore.activeChatPageNumber = 1
			this.activeContact = null
		} else if (this.activeContact && this.activeContact.id === id) {
			chatStore.activeChatPageNumber = 1
			this.activeContact = null
		} else {
			chatStore.setActiveChat(null)
			this.activeContact = this.contact.find(item => item.id === id)
			chatStore.activeChatPageNumber = 1
			chatStore.init(this.activeContact)
		}
	}

	@action
	getAvatar(id: string) {
		let contact = this.getContact(id)
		return contact.avatar
	}

	@action
	async init(data: any) {
		const dataContact = []

		if (!data.length) {
			this.contact = []
			appStore.setLoading(true)
			return
		}

		for (let i = 0; i < data.length; i++) {
			const contact_item = data[i]
			const initContact: IContact = {
				...contact_item,
				setStatus(status: string) {
					this.status = status
				},
				setLastMsg(msg_id: string) {
					this.last_message_id = msg_id
				}
			}

			dataContact.push(initContact)
		}

		if (JSON.stringify(this.contact) !== JSON.stringify(dataContact)) {
			for (let i = 0; i < this.contact.length; i++) {
				const localContact = this.contact[i]

				let serverContact = dataContact[i]
				if (!serverContact) {
					continue
				}

				// Проверка на последнее сообщение, если оно не соответствует старому - загрузить новые сообщения
				if (this.activeContact && this.activeContact.id === localContact.id) {
					if (localContact.last_message.id !== serverContact.last_message.id) {
						await chatStore.loadMessages(this.activeContact.id, 1)
						$('.msg_space').animate({ scrollTop: $('.msg_space').prop('scrollHeight') }, 0)
					}
				}
			}

			if (this.contact.length) {
				// Замена первых 20 контактов
				for (let i = 0; i <= 19; i++) {
					this.contact[i] = dataContact[i]
				}
			} else {
				this.contact = dataContact
			}
		}

		appStore.setLoading(true)
	}
}

export const contactStore = new ContactStore()
