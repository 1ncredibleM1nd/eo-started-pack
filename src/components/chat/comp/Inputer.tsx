import React, { Fragment, useState, useEffect, useRef } from 'react'
import { inject, observer } from 'mobx-react'
import IStores, { IChatStore, IContactStore, IUserStore, IAppStore } from '@stores/interface'
import { Icon } from '@ui'
import $ from 'jquery'
import { Input, Menu, Button, Popover, Modal, Switch } from 'antd'
import SocialMenu from './SocialMenu'
import {CloseOutlined} from "@ant-design/icons";
// import SmileMenu from './comp/SmileMenu'

type IProps = {
	chatStore?: IChatStore,
	contactStore?: IContactStore,
	userStore?: IUserStore,
	appStore?: IAppStore
	helperMenu?: any
}

const Inputer = inject((stores: IStores) => ({
	chatStore: stores.chatStore,
	contactStore: stores.contactStore,
	userStore: stores.userStore,
	appStore: stores.appStore
}))(
	observer((props: IProps) => {
		const { chatStore, contactStore, userStore, appStore } = props
		const activeContact = contactStore.activeContact
		const hero = userStore.hero
		const [draft, setDraft] = useState({})
		const [switcher, setSwitcher] = useState('')
		const [status, setStatus] = useState('default')
		const [acceptType, setAcceptType] = useState('file_extension|audio/*|video/*|image/*|media_type')
		const [currentFileType, setCurrentFileType] = useState('file')
		const [fileOnHold, setFileOnHold] = useState([])
		const [fileToSend, setFileToSend] = useState([])
		const inputRef = useRef(null)
		const fileInputRef = useRef(null)

		let currentChat: any
		if (chatStore.loaded && activeContact) {
			currentChat = chatStore.activeChat
		}

		useEffect(() => {
			if (currentChat && currentChat.msg.length) {
				setTimeout(() => {
					$('.msg_space').animate({ scrollTop: $('.msg_space').prop('scrollHeight') }, 0)
				})

				if (activeContact && !draft[activeContact.id + status]) {
					$('.main_input input').val('')
				}
			}
		}, [])

		const [keys, setKeys] = useState({
			shift: false,
			alt: false,
			ctrl: false
		})

		const handleKeyDown = (e: any) => {
			switch (e.key) {
				case 'Control':
					setKeys({ ...keys, ctrl: true })
					break
				case 'Shift':
					setKeys({ ...keys, shift: true })
					break
				case 'Alt':
					setKeys({ ...keys, alt: true })
					break
				default:
					break
			}
		}

		const handleKeyUp = (e: any) => {
			switch (e.key) {
				case 'Control':
					setKeys({ ...keys, ctrl: false })
					break
				case 'Shift':
					setKeys({ ...keys, shift: false })
					break
				case 'Alt':
					setKeys({ ...keys, alt: false })
					break
				default:
					break
			}
		}

		const handleEnter = async (e: any) => {
			e.preventDefault()

			let message = draft[activeContact.id + status]
			setDraft({ ...draft, [activeContact.id + status]: '' })
			if (keys.alt || keys.shift || keys.ctrl) {
				let text = ''
				if (draft[activeContact.id + status]) {
					text = draft[activeContact.id + status] + '\n'
				}

				setDraft({ ...draft, [activeContact.id + status]: text })
			} else {
				if (draft[activeContact.id + status] && draft[activeContact.id + status].length) {
					await chatStore.addMsg(message, hero.id, currentChat.activeSocial, null)
					setTimeout(() => {
						$('.msg_space').animate({ scrollTop: $('.msg_space').prop('scrollHeight') }, 0)
					})
					await chatStore.sendMessage(message, activeContact.conversation_source_account_id, appStore.school, fileToSend, currentChat.active_msg)
					setFileOnHold([])
					setFileToSend([])
					await chatStore.loadMessages(activeContact.id, 1)
				}
				setDraft({ ...draft, [activeContact.id + status]: '' })
			}
		}

		const onChange = (name: string, value: string, event: any) => {
			setDraft({ ...draft, [name + status]: value })

			setTimeout(() => {
				$('.msg_space').animate({ scrollTop: $('.msg_space').prop('scrollHeight') }, 0)
			})
		}

		// const onFocusInput = () => {
		// 	chatStore.readAllMsg(currentChat.id)
		// }

		const onSend = async () => {
			let message = draft[activeContact.id + status]
			setDraft({ ...draft, [activeContact.id + status]: '' })
			switch (status) {
				case 'default':
					if (draft[activeContact.id + status] && draft[activeContact.id + status].length) {
						await chatStore.addMsg(draft[activeContact.id + status], hero.id, currentChat.activeSocial, null)
						await chatStore.sendMessage(draft[activeContact.id + status], activeContact.conversation_source_account_id, appStore.school, fileToSend, currentChat.active_msg)
						await chatStore.loadMessages(activeContact.id, 1)
						//sendMsg(currentChat.id, draft[activeContact.id + status],
						// activeContact.conversation_source_account_id, appStore.school) sendMsg(currentChat.id,
						// draft[activeContact.id + status])
					}
					setDraft({ ...draft, [activeContact.id + status]: '' })
					break
				case 'edit':
					chatStore.activeChat.active_msg.editMsg(draft[activeContact.id + status])
					setDraft({ ...draft, [activeContact.id + status]: '' })
					chatStore.setActiveMsg(null)
					setStatus('default')
					break
				case 'reply':
					chatStore.addMsg(message, hero.id, currentChat.activeSocial, chatStore.activeChat.active_msg.content)
					setDraft({ ...draft, [activeContact.id + 'default']: '', [activeContact.id + status]: '' })
					chatStore.setActiveMsg(null)
					setStatus('default')
					break
				default:
					break
			}

			$('.main_input input').val('')

			if (draft[activeContact.id + status] !== undefined && draft[activeContact.id + status] !== '') {
				setTimeout(() => {
					$('.msg_space').animate({ scrollTop: $('.msg_space').prop('scrollHeight') }, 0)
				})
			}
		}

		const activeFileHandler = async (value: string, type: string) => {
			await setCurrentFileType(type)
			await setAcceptType(value)
			await setSwitcher('')
			fileInputRef.current.click()
		}

		const DropDownAttachments = () => {
			return (<Menu>
				<Menu.Item onClick={() => activeFileHandler('image/*', 'image')}>
					Фотография
				</Menu.Item>
				<Menu.Item onClick={() => activeFileHandler('video/*', 'video')}>
					Видео
				</Menu.Item>
				<Menu.Item
					onClick={() => activeFileHandler('file_extension|audio/*|video/*|image/*|media_type', 'file')}>
					Документ
				</Menu.Item>
				<Menu.Item onClick={() => activeFileHandler('audio/*', 'audio')}>
					Аудио
				</Menu.Item>
			</Menu>)
		}

		const selectSocial = (social: string) => {
			currentChat.changeSocial(social)
			switcherOff()
		}

		const switcherOff = () => {
			setSwitcher('')
		}

		const { TextArea } = Input

		setTimeout(() => inputRef.current.focus(), 100)

		const handleFileInput = (e: any) => {
			e.preventDefault()

			let fileArray: any = []
			for (let i = 0; i < e.target.files.length; i++) {
				let file = e.target.files.item(i)

				if ((file.size > 10485760 && currentFileType === 'video') || currentFileType === 'file' || currentFileType === 'audio') {
					let data = {
						type: currentFileType,
						file: file
					}
					fileArray.push(data)
					continue
				}

				let reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = e => {
					const { result } = e.target
					let data = {
						url: result,
						type: currentFileType,
						file: file
					}
					fileArray.push(data)
				}
			}

			setFileToSend([...fileToSend, ...e.target.files])
			setFileOnHold([...fileOnHold, ...fileArray])

			fileInputRef.current.value = null
		}

		const bytesToSize = (bytes: any) => {
			let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

			if (bytes == 0) {
				return '0 Byte'
			}

			let i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))

			// @ts-ignore
			return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
		}

		const deleteFileOnHold = (index: number) => {
			let fileOnHoldCopy = fileOnHold.slice()
			fileOnHoldCopy.splice(index, 1)
			setFileOnHold(fileOnHoldCopy)

			let fileToSendCopy = fileToSend.slice()
			fileToSendCopy.splice(index, 1)
			setFileToSend(fileToSendCopy)
		}

		const changeFileOnHold = async (index: number) => {
			await fileInputRef.current.click()
			await deleteFileOnHold(index)
		}

		const modalFileContoller = (index: number) => <div className="file_modal-file-controller">
			<div onClick={() => deleteFileOnHold(index)} className="file_controller-item delete">
				<Icon className='icon_m lite-grey' name='solid_times' />
			</div>
			<div onClick={() => changeFileOnHold(index)} className="file_controller-item change">
				<Icon className='icon_s lite-grey' name='solid_pen' />
			</div>
		</div>


		if (!currentChat) {
			return (
				<div className="chat">
					Loading
				</div>
			)
		}

		return (
			<div className="inputer">
				<Modal visible={fileOnHold.length > 0}
					onCancel={() => {
						setFileOnHold([])
						setFileToSend([])
					}}
					footer={[
						<Button key="back" className='font_size-normal' type="primary"
							onClick={() => {
								setFileOnHold([])
								setFileToSend([])
							}}>
							Отмена
					       </Button>,
						<Button key="submit" className='font_size-normal' type="primary"
							onClick={ handleEnter }>
							Отправить
					       </Button>
					]}
				>

					<div className="file_modal">
						<div className="file-holder-container">
							{
								fileOnHold.map((file_item: any, index: number) => {
									if (file_item.type === 'image') {
										return (
											<div className="file-holder">
												{modalFileContoller(index)}
												<div className="file-holder-preview">
													<div className="content">
														<img src={file_item.url} alt="" />
													</div>
												</div>

												<div className="file-holder-info">
													<div className="name">
														{file_item.file.name}
													</div>
													<div className="size">
														{
															bytesToSize(file_item.file.size)
														}
													</div>
												</div>
											</div>
										)
									}
									if (file_item.type === 'audio') {
										return (
											<div className="file-holder video-holder">
												{modalFileContoller(index)}
												<div className="file-holder-preview">
													<div className="content">
														<div className="play-icon">
															<Icon className='icon_m white' name='solid_file-audio' />
														</div>
														{
															file_item.url ? (<Fragment>
																<video autoPlay muted>
																	<source src={file_item.url} type='video/mp4' />
																</video>
															</Fragment>) : (<Fragment></Fragment>)
														}
													</div>
												</div>
												<div className="file-holder-info">
													<div className="name">
														{file_item.file.name}
													</div>
													<div className="size">
														{
															bytesToSize(file_item.file.size)
														}
													</div>
												</div>
											</div>
										)
									}

									if (file_item.type === 'file') {
										return (
											<div className="file-holder video-holder">
												{modalFileContoller(index)}
												<div className="file-holder-preview file">
													<div className="content">
														<div className="play-icon">
															<Icon className='icon_m white' name='solid_file' />
														</div>
													</div>
												</div>
												<div className="file-holder-info">
													<div className="name">
														{file_item.file.name}
													</div>
													<div className="size">
														{
															bytesToSize(file_item.file.size)
														}
													</div>
												</div>
											</div>
										)
									}

									if (file_item.type === 'video') {
										return (
											<div className="file-holder video-holder">
												{modalFileContoller(index)}
												<div className="file-holder-preview">
													<div className="content">
														<div className="play-icon">
															<Icon className='icon_m white' name='solid_play' />
														</div>
														{
															file_item.url ? (<Fragment>
																<video autoPlay muted>
																	<source src={file_item.url} type='video/mp4' />
																</video>
															</Fragment>) : (<Fragment></Fragment>)
														}
													</div>
												</div>
												<div className="file-holder-info">
													<div className="name">
														{file_item.file.name}
													</div>
													<div className="size">
														{
															bytesToSize(file_item.file.size)
														}
													</div>
												</div>
											</div>
										)
									}

									return null
								})
							}
						</div>
						<div className="file_modal-options">
							{
								fileOnHold.find((file: any) => file.type === 'image') &&
								<div className="compression-switch">
									<Switch size="small" defaultChecked />
                                    Оптимизировать изображения
                                </div>
							}
						</div>
						<div className="file_modal-input">
							<div className="inputer_btn">
								<Popover onVisibleChange={(e) => {
									e ? {} : setSwitcher('')
								}} visible={switcher === 'attachments_modal'} content={<DropDownAttachments />}
									trigger="click">
									<Button onClick={() => {
										switcher === 'attachments_modal' ? setSwitcher('') : setSwitcher('attachments_modal')
									}} className='transparent'>
										<Icon className='icon_m blue-lite' name='solid_plus' />
									</Button>
								</Popover>
							</div>
							<div className="main_input in_modal">
								<TextArea onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => handleKeyUp(e)}
									onPressEnter={(e) => handleEnter(e)} autoSize
									placeholder='Ваше сообщение'
									ref={inputRef}
									onChange={(e) => onChange(activeContact.id, e.target.value, e)}
									value={draft[activeContact.id + status]} />
							</div>
						</div>
					</div>
				</Modal>


				<div className="input-container">

					{/*<div className="inputer_btn">*/}
					{/*	<div className='helper_menu'>*/}
					{/*		<AlignCenterOutlined onClick={props.helperMenu}/>*/}
					{/*	</div>*/}
					{/*</div>*/}

					<div className="inputer_btn">
						{/* убрать единичку */}
						<Popover onVisibleChange={(e) => {
							e ? {} : setSwitcher('')
						}} visible={switcher === '1social'} content={<SocialMenu selectSocial={selectSocial} />}
							trigger="click">

							<Button onClick={() => setSwitcher('social')} className='transparent not-allowed'>
								<Icon className='icon_l'
									name={`social_media_${ currentChat.activeSocial ? currentChat.activeSocial : '' }`} />
							</Button>
						</Popover>
					</div>

					<div className="main_input">
						{
							chatStore.activeChat.active_msg ? (<Fragment>
								<div className="selected-container">
									{ chatStore.activeChat.active_msg.content }
									<CloseOutlined className="close" onClick={() => chatStore.setActiveMsg(null)} />
								</div>
							</Fragment>) : (<Fragment></Fragment>)
						}
						<TextArea onKeyDown={ handleKeyDown } onKeyUp={ handleKeyUp }
							onPressEnter={ handleEnter } autoSize
							placeholder='Ваше сообщение'
							ref={ inputRef }
							onChange={(e) => onChange(activeContact.id, e.target.value, e)}
							value={ draft[activeContact.id + status] } />
					</div>

					{/*<div className="inputer_btn">*/}
					{/*	<Popover onVisibleChange={(e) => {*/}
					{/*		e ? {} : setSwitcher('')*/}
					{/*	}} visible={ switcher === 'attachments' } content={ <DropDownAttachments /> } trigger="click">*/}
					{/*		<Button onClick={() => {*/}
					{/*			switcher === 'attachments' ? setSwitcher('') : setSwitcher('attachments')*/}
					{/*		}} className='transparent'>*/}
					{/*			<Icon className='icon_m blue-lite' name='solid_paperclip' />*/}
					{/*		</Button>*/}
					{/*	</Popover>*/}
					{/*</div>*/}

				</div>

				<div onClick={() => onSend()} className="send_btn">
					<Icon className='icon_x white' name='solid_another-arrow' />
				</div>
				<input type="file" hidden accept={acceptType} name='files' ref={fileInputRef} multiple
					   onChange={handleFileInput} />

			</div>
		)
	}))


export default Inputer
