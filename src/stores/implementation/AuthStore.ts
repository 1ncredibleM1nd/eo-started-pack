import { action, observable } from 'mobx'
import { isLogged, setSession, getUserData } from '@actions'
import IAuthStore from '@stores/interface/app/IAuthStore'
import CONFIG from "../../config"

export class AuthStore implements IAuthStore {
	checkLogin: () => void
	@observable loading: boolean = false
	@observable isFrame: boolean = false

	@action
	setLoader(loading: boolean) {
		this.loading = loading
	}

	@action
	setToken(token: string) {
		localStorage.setItem('token', token)
	}

	@action
	async login() {
		if (!this.isFrame) {
			const currentUrl = new URL(location.href)
			let encryptedSessionData: any
			const loggedData = await isLogged()

			if (currentUrl.search.includes('encrypted_session_data')) {
				encryptedSessionData = currentUrl.searchParams.get('encrypted_session_data')
				if (encryptedSessionData) await setSession(encryptedSessionData)
				currentUrl.searchParams.delete('encrypted_session_data')
				currentUrl.searchParams.delete('pid')
				history.replaceState(history.state, null, currentUrl.href)
			}

			if (loggedData.success) {
				localStorage.setItem('token', loggedData.token)
				await getUserData()
			} else {
				if (!encryptedSessionData) {
					window.location.href = `${CONFIG.BASE_AUTH_URL}/?redirect_url=${window.location.href}`
				}
			}
		}
	}

	@action
	async initialize(): Promise<boolean> {
		// Очистка
		localStorage.removeItem('userId')
		localStorage.removeItem('timestamp')
		localStorage.removeItem('token')
		localStorage.setItem('rest', 'v1')

		const currentUrl = new URL(location.href)
		if (currentUrl.search.includes('encrypted_data')) {
			this.isFrame = true
			let encrypted_data = await currentUrl.searchParams.get('encrypted_data')
			let decrypted_data = await atob(encrypted_data).split('_')
			localStorage.setItem('rest', 'rest')
			localStorage.setItem('timestamp', decrypted_data[0])
			localStorage.setItem('userId', decrypted_data[1])
			localStorage.setItem('token', decrypted_data[2])
		}

		await this.login()

		return true
	}
}

export const authStore = new AuthStore()
