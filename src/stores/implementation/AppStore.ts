import { action, observable } from 'mobx'
import { IAppStore } from '@stores/interface'
import { contactStore, userStore } from '@stores/implementation'
import { getConversations, getSchools, getUserData } from '@actions'


export class AppStore implements IAppStore {
	@observable loaded: boolean = false
	@observable info_tab: string = 'none'
	@observable layout: string = 'contact'
	@observable school: any = 10469
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
	setSchoolId(id: string) {
		this.loaded = false
		//в initialization устанавливаем школу
		this.initialization(id)
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
	}

	@action
	async initialization(schoolArg?: any) {
		try {
			let u_data = await getUserData()
			let hero = u_data.data.data


			let paramsString = document.location.search
			let searchParams = new URLSearchParams(paramsString)

			this.school = schoolArg ? schoolArg : await searchParams.get('school') ? await searchParams.get('school') : this.school

			let conversations = await getConversations(this.school, this.activeContactPageNumber)

			try {
				let run = async () => {
					conversations = await getConversations(this.school, 1)
					await contactStore.init(conversations.data)
					setTimeout(run, 1000)
				}
				setTimeout(() => run(), 1000)
			} catch (e) {
				throw new Error(e)
			}
			await this.initSchools()
			await userStore.initHero(hero)
			this.loaded = true
		} catch (e) {
			console.error(e)

		}
	};

}

export const appStore = new AppStore()
