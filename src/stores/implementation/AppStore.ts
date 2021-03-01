import {action, observable} from 'mobx'
import {IAppStore} from '@stores/interface'
import {contactStore, chatStore, userStore} from '@stores/implementation'
import {getConversations, getUserData} from '@actions'

export class AppStore implements IAppStore {
	@observable loaded: boolean = false
	@observable info_tab: string = 'none'
	@observable layout: string = 'contact'
	@observable school: string = 'turstar'
	
	
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
		this.school = id
	}
	
	@action
	setLayout(value: string) {
		this.layout = value
	}
	
	@action
	async initialization() {
		try {
			let u_data = await getUserData()
			let hero = u_data.data.data
			
			let paramsString = document.location.search
			let searchParams = new URLSearchParams(paramsString)
			
			this.school = await searchParams.get('school')
			
			let conversations = await getConversations(this.school)
			try {
				let run = async () => {
					conversations = await getConversations(this.school)
					await contactStore.init(conversations.data)
					await chatStore.init(contactStore.activeContact)
					setTimeout(run, 1000)
				}
				setTimeout(() => run(), 1000)
			} catch (e) {
				throw new Error(e)
			}
			await userStore.initHero(hero)
			this.loaded = true
		} catch (e) {
			console.error(e)
			
		}
	};
	
}

export const appStore = new AppStore()
