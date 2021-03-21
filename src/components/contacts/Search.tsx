import React, { useState, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import IStores, { IAppStore, IChatStore, IContactStore } from '@stores/interface'
import { Input, Switch, Collapse, Button, Drawer, Select } from 'antd'
import Settings from './comp/Settings'
import AllContacts from './comp/AllContacts'
import './Search.scss'
import { Icon } from '@ui'

type IProps = {
	contactStore?: IContactStore,
	appStore?: IAppStore,
	chatStore?: IChatStore
}

const Search = inject((stores: IStores) => ({
	contactStore: stores.contactStore,
	appStore: stores.appStore,
	chatStore: stores.chatStore
}))(
	observer((props: IProps) => {

		const { contactStore, appStore, chatStore } = props
		const [searchText, setSearchText] = useState('')
		const [drawer, setDrawer] = useState('')
		let school_list: any = appStore.school_list
		const socials = contactStore.source
		const switcher = contactStore.filterSwitch

		const onChange = (value: string) => {
			setSearchText(value)
			contactStore.setSearch(value)
		}

		function handleMenuClick(school_id: any) {
			contactStore.setActiveContact(null)
			chatStore.init(contactStore.activeContact)
			appStore.setLayout('chat')

			appStore.setSchoolId(school_id)
		}


		const onChangeSocial = (social: any) => {
			contactStore.filterSocial(social)
		}

		// const onChangeType = (type: any) => {
		// 	//contactStore.setFilter('type', type)
		// }

		// const addChat = () => {
		// 	setDrawer('contacts')
		// }

		// const copiedProfile = () => {
		// 	message.success('Логин скопирован')
		// }

		// const openSettings = () => {
		// 	setDrawer('settings')
		// }

		const onDrawerClose = () => {

		}

		const closeDrawer = () => {
			setDrawer('')
		}

		const { Panel } = Collapse
		const { Search } = Input
		const { Option } = Select

		return (
			<Fragment>
				<div className="contact_header">
					<Drawer
						title={
							<div className='settings_title'>
								<span>Настройки</span>
								<div className="close_trigger">
									<Button onClick={() => closeDrawer()} className='transparent'>
										<Icon name='solid_times' className={`icon_m lite-grey`} />
									</Button>
								</div>
							</div>
						}
						placement={'left'}
						closable={false}
						onClose={() => onDrawerClose()}
						visible={drawer === 'settings'}
						key={'left'}
						width={440}
					>
						<Settings />
					</Drawer>

					<Drawer
						title={
							<div className='settings_title'>
								<span>Контакты</span>
								<div className="close_trigger">
									<Button onClick={() => closeDrawer()} className='transparent'>
										<Icon name='solid_times' className={`icon_m lite-grey`} />
									</Button>
								</div>
							</div>
						}
						placement={'left'}
						closable={false}
						onClose={() => onDrawerClose()}
						visible={drawer === 'contacts'}
						key={'left'}
						width={440}
					>
						<AllContacts />
					</Drawer>

					{/*<div className="search_header">*/}
					{/*	<div className="settings_profile">*/}
					{/*		<Button onClick={() => openSettings()} className='transparent'>*/}
					{/*			<Icon name='solid_cog' className={`icon_s lite-grey`}/>*/}
					{/*		</Button>*/}
					{/*	</div>*/}
					{/*	<div className="control">*/}
					{/*		<div className="add_chat_trigger">*/}
					{/*			<Button onClick={() => addChat()} className='transparent'>*/}
					{/*				<Icon name='solid_plus' className={`icon_s blue-lite`}/>*/}
					{/*			</Button>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*</div>*/}

					<div className="search">
						<div className="search-filter">
							<Button disabled={!appStore.loaded} onClick={() => contactStore.toggleFilterSwitch()} className='transparent'>
								<Icon name='solid_cog' className={`icon_s ${switcher ? 'accent' : 'blue-lite'}`} />
							</Button>
						</div>
						<div className="search-input">
							<Search disabled placeholder="Поиск..." value={searchText} onChange={(e) => onChange(e.target.value)}
								enterButton />
						</div>
					</div>

					<Collapse bordered={false} accordion activeKey={switcher ? '1' : ''}>
						<Panel header='' key="1">
							<div className='channel-container'>
								<div className='channel-item'>
									<Icon name='social_media_telegram' className='icon_s' />
									<Switch size="small" defaultChecked={socials['telegram']}
										onChange={() => onChangeSocial('telegram')} />
								</div>
								<div className='channel-item'>
									<Icon name='social_media_vkontakte' className='icon_s' />
									<Switch size="small" defaultChecked={socials['vkontakte']}
										onChange={() => onChangeSocial('vkontakte')} />
								</div>
								<div className='channel-item'>
									<Icon name='social_media_odnoklassniki' className='icon_s' />
									<Switch size="small" defaultChecked={socials['odnoklassniki']}
										onChange={() => onChangeSocial('odnoklassniki')} />
								</div>
								{/* <div className='channel-item'>
									<Icon name='social_media_whatsapp' className='icon_s' />
									<Switch disabled={true} size="small" defaultChecked={socials['whatsapp']}
										onChange={() => onChangeSocial('whatsapp')} />
								</div>
								<div className='channel-item'>
									<Icon name='social_media_viber' className='icon_s' />
									<Switch disabled={true} size="small" defaultChecked={socials['viber']}
										onChange={() => onChangeSocial('viber')} />
								</div>
								<div className='channel-item'>
									<Icon name='social_media_facebook' className='icon_s' />
									<Switch disabled={true} size="small" defaultChecked={socials['facebook']}
										onChange={() => onChangeSocial('facebook')} />
								</div>
								<div className='channel-item'>
									<Icon name='social_media_instagram' className='icon_s' />
									<Switch disabled={true} size="small" defaultChecked={socials['instagram']}
										onChange={() => onChangeSocial('instagram')} />
								</div>
								<div className='channel-item'>
									<Icon name='social_media_email' className='icon_s' />
									<Switch disabled={true} size="small" defaultChecked={socials['email']}
										onChange={() => onChangeSocial('email')} />
								</div> */}
							</div>
							{/* <div className="type_container">
								<Radio.Group onChange={onChangeType} defaultValue="all">
									<Radio.Button className='radio_btn all ' value="all">
										<Icon name='solid_star-of-life' className='blue-lite ' />
									</Radio.Button>
									<Radio.Button className='radio_btn' value="comments">Комментарии</Radio.Button>
									<Radio.Button className='radio_btn' value="msg">Сообщения</Radio.Button>
									<Radio.Button className='radio_btn' value="request">Заявки</Radio.Button>
								</Radio.Group>
							</div> */}
							<div className="school-filter">
								<Select defaultValue={null} onChange={handleMenuClick}>
									<Option value={null}>Все контакты</Option>
									{Object.keys(school_list).map((s: any) => <Option
										value={s}>{school_list[s]}</Option>)}
								</Select>
							</div>
						</Panel>
					</Collapse>
				</div>
			</Fragment>

		)
	}))

export default Search
