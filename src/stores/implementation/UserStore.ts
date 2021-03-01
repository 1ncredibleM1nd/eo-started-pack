import {action, observable, reaction} from 'mobx'
import {IUserStore, IUser} from '@stores/interface'
import {getSchools} from '@actions'

export class UserStore implements IUserStore {
	@observable hero: IUser
	@observable avaliableUsers: IUser[] = []
	@observable school_list: any = []
	
	constructor() {
		reaction(() => {
			return this.avaliableUsers
		}, () => {
		
		})
	}
	
	@action
	async initHero(data: any) {
		let data_school = await getSchools()
		this.school_list = data_school.data.data
		this.hero = data
	};
	
}

export const userStore = new UserStore()
