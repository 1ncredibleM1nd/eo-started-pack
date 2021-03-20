import { action, observable, reaction } from 'mobx'
import { IUserStore, IUser } from '@stores/interface'

export class UserStore implements IUserStore {
	@observable hero: IUser
	@observable availableUsers: IUser[] = []

	constructor() {
		reaction(() => {
			return this.availableUsers
		}, () => {})
	}

	@action
	async initHero(data: any) {
		this.hero = data
	}
}

export const userStore = new UserStore()
