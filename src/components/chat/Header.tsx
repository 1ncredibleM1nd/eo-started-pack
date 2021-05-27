import React, {Fragment} from 'react'
import ModalWindow from './ModalWindow'
import {inject, observer} from 'mobx-react'
import IStores, {IAppStore, IChatStore, IContactStore, IUserStore} from '@stores/interface'
import {Button} from 'antd'

import './Header.scss'
import {Icon} from '@ui'
import MoonLoader from 'react-spinners/MoonLoader'


type IProps = {
	chatStore?: IChatStore,
	userStore?: IUserStore,
	contactStore?: IContactStore
	appStore?: IAppStore
}

const Header = inject((stores: IStores) => ({
	appStore: stores.appStore,
	chatStore: stores.chatStore,
	userStore: stores.userStore,
	contactStore: stores.contactStore
}))(
	observer((props: IProps) => {
		const {chatStore, contactStore, appStore} = props
		const activeContact = contactStore.activeContact
		let chatTitle: any
		let activeMsg: any

		if (activeContact) chatTitle = activeContact.name


		const closeConctact = () => {
			if (appStore.layout === 'contact') {
				appStore.setLayout('info')
			} else if (appStore.layout === 'info') {
				appStore.setLayout('contact')
			} else if (appStore.layout === 'chat') {
				appStore.setLayout('contact')
				contactStore.setActiveContact(null)
			}
		}

		return (
			<div className="chat_header">
				{
					activeMsg ? (<Fragment>
					</Fragment>) : (<Fragment>
						{
							chatTitle ? (<Fragment>
								<div className="header_content">
									<div className={`back_trigger ${appStore.layout !== 'contact' ? 'active' : ''}`}>
										<Button onClick={() => closeConctact()} className='transparent'>
											<Icon className='icon_s blue-lite' name={`solid_arrow-left`} />
										</Button>
									</div>
									<div className={`header_title`}>
										<div className='title'>
											<p>{chatTitle}</p>
										</div>

										<div className="header_settings">
											<div className="trigger">
												{
													chatStore.pageLoading ? (<Fragment>
														<MoonLoader color='#3498db' size={18} />
													</Fragment>) : (<Fragment></Fragment>)
												}

											</div>
										</div>
									</div>
									<div className="header_info">
										<Button onClick={() => appStore.setLayout('info')} className='transparent'>
											<Icon className='icon_l lite-grey' name={`solid_users-cog`} />
										</Button>
									</div>
								</div>
							</Fragment>) : (<Fragment>

							</Fragment>)
						}
					</Fragment>)
				}
				<ModalWindow />
			</div>
		)
	}))

export default Header
