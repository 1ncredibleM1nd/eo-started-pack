import { action, observable, reaction } from 'mobx'
import { IUserStore, IUser } from '@stores/interface'
import {getUserData} from "@actions";

export class UserStore implements IUserStore {
	@observable hero: IUser
	@observable availableUsers: IUser[] = []

	constructor() {
		reaction(() => {
			return this.availableUsers
		}, () => {})
	}

	@action
	async initHero() {
		this.hero = await getUserData()
	}
}

export const userStore = new UserStore()
