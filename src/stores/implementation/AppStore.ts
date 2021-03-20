import { action, observable } from 'mobx'
import { IAppStore } from '@stores/interface'
import { contactStore, userStore } from '@stores/implementation'
import { getConversations, getSchools, getUserData } from '@actions'
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
		let school_res = await getSchools()
		this.school_list = school_res.data.data
		let paramsString = document.location.search
		let searchParams = new URLSearchParams(paramsString)
		this.school = searchParams.get('school') ? searchParams.get('school') : this.school
	}

	@action
	async updateContact() {
		let conversations = await getConversations(this.school, 1)
		await contactStore.init(conversations.data)
	}

	@action
	async initialization() {
		let u_data = await getUserData()
		await this.initSchools()

		let hero = u_data.data.data
		await userStore.initHero(hero)

		// сконфигурируем уведомления
		notification.config(NotificationSettings)

		try {
			let run = async () => {
				await this.updateContact()
				setTimeout(run, 2000)
			}

			run()
		} catch (e) {
			throw new Error(e)
		}
	};

}

export const appStore = new AppStore()
