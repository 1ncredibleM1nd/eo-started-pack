import { action, observable } from 'mobx'
import { IAppStore } from '@stores/interface'
import { contactStore, userStore } from '@stores/implementation'
import { getConversations, getSchools } from '@actions'
import { notification } from "antd"
// @ts-ignore
import { NotificationSettings } from '../../Config/Config'

export class AppStore implements IAppStore {
	@observable loaded: boolean = false
	@observable info_tab: string = 'none'
	@observable layout: string = 'contact'
	@observable school: any = ''
	@observable school_list: any = []
	activeContactPageNumber: number = 1

	@action
	setInfoTab(tab: string) {
		if (this.info_tab === tab) {
			this.info_tab = 'none'
		} else {
			this.info_tab = tab
		}
	}

	@action
	setLoading(loading: boolean) {
		this.loaded = loading
	}

	@action
	setSchool(school: string) {
		this.school = school
	}

	@action
	setSchoolId(id: string) {
		this.setLoading(false)
		this.setSchool(id)
		contactStore.contact = []
		this.updateContact()
	}

	@action
	setLayout(layout: string) {
		this.layout = layout
	}

	@action
	setContactPageNumber(value: number) {
		this.activeContactPageNumber = value
	}

	@action
	async initSchools() {
		this.school_list = await getSchools()
	}

	@action
	async updateContact() {
		const conversation_list = await getConversations(this.school, 1)

		await contactStore.init(conversation_list)
	}

	@action
	async initialization() {
		await userStore.initHero()

		await this.initSchools()

		// сконфигурируем уведомления
		notification.config(NotificationSettings)

		this.runUpdateContact()
	}

	async runUpdateContact() {
		await this.updateContact()

		setTimeout(() => this.runUpdateContact(), 1000)
	}
}

export const appStore = new AppStore()
