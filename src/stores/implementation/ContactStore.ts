import { action, computed, observable, reaction } from 'mobx'
import {IContactStore, IContact} from '@stores/interface'
import { chatStore, appStore } from '@stores/implementation'
import { getConversations } from '@actions'
import $ from 'jquery'
import IMessagesList from "@stores/interface/app/IMessagesList";

export class ContactStore implements IContactStore {
	@observable contact: IContact[] = []
	@observable activeContact: IContact
	@observable search: string = ''
	@observable filterSwitch: boolean = false
	@observable sources: any = {
		'whatsapp': false,
		'instagram': false,
		'vkontakte': true,
		'odnoklassniki': true,
		'viber': false,
		'facebook': true,
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
		this.sources[key] = !this.sources[key]
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

		let conversations = await getConversations(appStore.getActiveSchools(), appStore.activeContactPageNumber + 1)

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
	setLastMsg(id: string, message_id: string) {
		let contact = this.getContact(id)

		contact.setLastMsg(message_id)
	}

	@action
	setStatus(id: string, status: string) {
		let contact = this.getContact(id)

		contact.setStatus(status)
	}

	@action
	async setActiveContact(id: string) {
		chatStore.setPageNumber(1)

        if(this.activeContact && this.activeContact.id === id){
            return
        }

		if (id === null) {
			this.activeContact = null
		} else {
			chatStore.setPageLoading(true)

			await this.setActiveContact(null)
			await chatStore.setActiveChat(null)

			this.activeContact = this.contact.find(contact => contact.id === id)
			await chatStore.setActiveChat(this.activeContact)
			chatStore.collectMessagesList(chatStore.activeChat.contact_id, 1)
				.then(({ contactId, messages }: IMessagesList) => {
					if (contactId !== this.activeContact.id) {
						return
					}

					chatStore.activeChat.setMessages(messages)
					chatStore.setPageLoading(false)

					chatStore.activateLastMessage()

					setTimeout(() => {
						$('.msg_space').animate({ scrollTop: $(`.page-1`).height() }, 0)
					})
				})
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
				setLastMsg(message_id: string) {
					this.last_message_id = message_id
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
						chatStore.activateLastMessage()

						setTimeout(() => {
							$('.msg_space').animate({ scrollTop: $('.msg_space').prop('scrollHeight') }, 0)
						})
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
