import { action, observable } from 'mobx'
import { isLogged, setSession, getUserData } from '@actions'
import IAuthStore from '@stores/interface/app/IAuthStore'

window.addEventListener('focus', async () => {
	await isLogged()
})

export class AuthStore implements IAuthStore {
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

		if (!this.isFrame) {
			const { data: { data: { token, success } } } = await isLogged()
			console.log('isLogged', success)
			if (currentUrl.search.includes('encrypted_session_data')) {
				const encryptedSessionData = currentUrl.searchParams.get('encrypted_session_data')
				if (encryptedSessionData) await setSession(encryptedSessionData)
				currentUrl.searchParams.delete('encrypted_session_data')
				currentUrl.searchParams.delete('pid')
				history.replaceState(history.state, null, currentUrl.href)
			}
			if (success) {
				localStorage.setItem('token', token)
				await getUserData()
			} else {
				window.location.href = `https://account.dev.prodamus.ru/?redirect_url=${window.location.href}`
			}
		}
		return true
	}

}


export const authStore = new AuthStore()
