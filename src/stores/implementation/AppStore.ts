import { action, observable } from 'mobx'
import { IAppStore } from '@stores/interface'
import { contactStore, userStore } from '@stores/implementation'
import { getConversations, getSchools, getUserData } from '@actions'
import { notification } from "antd"
// @ts-ignore
import {NotificationSettings} from '../../Config/Config'

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
	setLoading(value: boolean) {
		this.loaded = value
	}

	@action
	setSchoolId(id: string) {
		this.loaded = false
		this.school = id
		contactStore.contact = []
		this.updateContact()
	}

	@action
	setLayout(value: string) {
		this.layout = value
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
		let user_data = await getUserData()

		await userStore.initHero(user_data)

		await this.initSchools()

		// сконфигурируем уведомления
		notification.config(NotificationSettings)

		let run = async () => {
			await this.updateContact()

			setTimeout(run, 1000)
		}

		run()
	};

}

export const appStore = new AppStore()
