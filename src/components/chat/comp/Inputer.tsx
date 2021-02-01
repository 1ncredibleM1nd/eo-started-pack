import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore, IContactStore, IUserStore } from '@stores/interface';
import { Icon } from '@ui'
import $ from 'jquery'
import { Input, Menu, Button, Popover } from 'antd';
import SocialMenu from './SocialMenu'
// import SmileMenu from './comp/SmileMenu'
import { sendMsg } from '@actions'



type IProps = {
  chatStore?: IChatStore,
  contactStore?: IContactStore,
  userStore?: IUserStore
}

const Inputer = inject((stores: IStores) => ({ chatStore: stores.chatStore, contactStore: stores.contactStore, userStore: stores.userStore }))(
  observer((props: IProps) => {

    const { chatStore, contactStore, userStore } = props;
    const activeContact = contactStore.activeContact;
    const activeMsg = chatStore.activeMsg
    const hero = userStore.hero
    const [draft, setDraft] = useState({})
    const [switcher, setSwitcher] = useState('')
    const [status, setStatus] = useState('default')
    const [selectedMsg, setSelectedMsg] = useState(null)


    let currentChat: any;
    if (chatStore.chat && activeContact) {
      currentChat = chatStore.activeChat
    }

    useEffect(() => {
      if (activeMsg) {
        setSelectedMsg(activeMsg)
      } else {
        setSelectedMsg(null)
      }
      $(".msg_space").animate({ scrollTop: $('.msg_space').prop("scrollHeight") }, 0);
      if (activeContact && !draft[activeContact.id + status]) $('.main_input input').val('');

      if (currentChat && !currentChat.msg.length) {
        chatStore.loadMessages(activeContact.id)
      }
    })



    const [keys, setKeys] = useState({
      shift: false,
      alt: false,
      ctrl: false
    })


    const handleKeyDown = (e: any) => {
      switch (e.key) {
        case 'Control':
          setKeys({ ...keys, ctrl: true })
          break;
        case 'Shift':
          setKeys({ ...keys, shift: true })
          break;
        case 'Alt':
          setKeys({ ...keys, alt: true })
          break;
        default:
          break;
      }
    }

    const handleKeyUp = (e: any) => {
      switch (e.key) {
        case 'Control':
          setKeys({ ...keys, ctrl: false })
          break;
        case 'Shift':
          setKeys({ ...keys, shift: false })
          break;
        case 'Alt':
          setKeys({ ...keys, alt: false })
          break;
        default:
          break;
      }
    }


    const handleEnter = () => {
      if (keys.alt || keys.shift || keys.ctrl) {
        let text = draft[activeContact.id + status] + '\n'
        setDraft({ ...draft, [activeContact.id + status]: text })

      } else {
        if (draft[activeContact.id + status] && draft[activeContact.id + status].length) {
          chatStore.addMsg(currentChat.id, draft[activeContact.id + status], hero.id, currentChat.activeSocial, null)
          sendMsg(currentChat.id, draft[activeContact.id + status])
        }
        setDraft({ ...draft, [activeContact.id + status]: '' })
      }
    }

    const onChange = (name: string, value: string, event: any) => {
      setDraft({ ...draft, [name + status]: value })
    }


    const onSend = () => {
      switch (status) {
        case 'default':
          if (draft[activeContact.id + status].length) {
            chatStore.addMsg(currentChat.id, draft[activeContact.id + status], hero.id, currentChat.activeSocial, null)
            sendMsg(currentChat.id, draft[activeContact.id + status])
          }
          setDraft({ ...draft, [activeContact.id + status]: '' })
          break;
        case 'edit':
          activeMsg.editMsg(draft[activeContact.id + status])
          setDraft({ ...draft, [activeContact.id + status]: '' })
          chatStore.setActiveMsg(null, currentChat.id)
          setStatus('default')
          break;
        case 'reply':
          chatStore.addMsg(currentChat.id, draft[activeContact.id + status], hero.id, currentChat.activeSocial, selectedMsg)
          setDraft({ ...draft, [activeContact.id + 'default']: '', [activeContact.id + status]: '' })
          chatStore.setActiveMsg(null, currentChat.id)
          setStatus('default')
          break;
        default:
          break;
      }
      $('.main_input input').val('');
      $(".msg_space").animate({ scrollTop: $('.msg_space').prop("scrollHeight") }, 300);
    }


    const DropDownAttacments = () => {
      return (
        <Menu>
          <Menu.Item >
            Фотография
                    </Menu.Item>
          <Menu.Item>
            Видео
                    </Menu.Item>
          <Menu.Item >
            Документ
                    </Menu.Item>
          <Menu.Item >
            Аудио
                    </Menu.Item>
        </Menu>
      )
    }

    const selectSocial = (social: string) => {
      currentChat.changeSocial(social)
      switcherOff()
    }

    const switcherOff = () => {
      setSwitcher('')
    }

    const onFocusInput = () => {
      chatStore.readAllMsg(currentChat.id)
    }

    const { TextArea } = Input;

    return (
      <div className="inputer">
        <div className="input-container">
          <div className="inputer_btn">
            <Popover onVisibleChange={(e) => { e ? {} : setSwitcher('') }} visible={switcher === 'attacments'} content={<DropDownAttacments />} trigger="click">
              <Button onClick={() => { switcher === 'attacments' ? setSwitcher('') : setSwitcher('attacments') }} className='transparent'>
                <Icon className='icon_m blue-lite' name='solid_paperclip' />
              </Button>
            </Popover>
          </div>

          <div className="main_input">


            {
              selectedMsg ? (<Fragment>
                <div className="selected-container">
                  {selectedMsg['content']}
                </div>
              </Fragment>) : (<Fragment></Fragment>)
            }

            <TextArea onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => handleKeyUp(e)} onPressEnter={() => handleEnter()} onFocus={() => onFocusInput()} autoSize placeholder='Ваше сообщение' onChange={(e) => onChange(activeContact.id, e.target.value, e)} value={draft[activeContact.id + status]} />

          </div>
          <div className="inputer_btn">
            <Popover onVisibleChange={(e) => { e ? {} : setSwitcher('') }} visible={switcher === 'social'} content={<SocialMenu selectSocial={selectSocial} />} trigger="click">
              <Button onClick={() => setSwitcher('social')} className='transparent'>
                <Icon className='icon_l' name={`social_media_${currentChat.activeSocial}`} />
              </Button>
            </Popover>
          </div>
        </div>
        <div onClick={() => onSend()} className="send_btn">
          <Icon className='icon_x white' name='solid_another-arrow' />
        </div>
      </div>
    );
  }));

export default Inputer;
