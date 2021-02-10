import React, { useState, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IContactStore, IUserStore } from '@stores/interface';
import { Input, Radio, Switch, Collapse, Button, Drawer } from 'antd'
import Settings from './comp/Settings'
import AllContacts from './comp/AllContacts'
import './Search.scss'
import { Icon } from '@ui'


type IProps = {
    contactStore?: IContactStore,
    userStore?: IUserStore
}

const Search = inject((stores: IStores) => ({ contactStore: stores.contactStore, userStore: stores.userStore }))(
    observer((props: IProps) => {

        const { contactStore } = props;
        const [searchText, setSearchText] = useState('')
        const [drawer, setDrawer] = useState('')
        const [switcher, setSwitcher] = useState(false)
        // let hero = userStore.hero


        const filter = contactStore.filter
        let channel: any
        //let type: any
        if (filter) {
            channel = filter.channel
            //type = filter.type
        }


        const onChange = (value: string) => {
            setSearchText(value)
            contactStore.setSearch(value)
        }

        const onChangeSocial = (social: any) => {
            //contactStore.setFilter('social', social)
        }

        // const onChangeType = (type: any) => {
        //     //contactStore.setFilter('type', type)
        // }

        // const addChat = () => {
        //     setDrawer('contacts')
        // }

        // const copiedProfile = () => {
        //     message.success('Логин скопирован');
        // }

        // const openSettings = () => {
        //     setDrawer('settings')
        // }

        const onDrawerClose = () => {

        }

        const closeDrawer = () => {
            setDrawer('')
        }

        const { Panel } = Collapse;
        const { Search } = Input;

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

                    {/* <div className="search_header">
                        <div className="settings_profile">
                            <Button onClick={() => openSettings()} className='transparent'>
                                <Icon name='solid_cog' className={`icon_s lite-grey`} />
                            </Button>
                        </div>
                        <div className="profile_trigger">
                            {hero ? hero.username : ''}
                            <span onClick={() => copiedProfile()}>
                                {hero ? hero.unic : ''}
                            </span>
                        </div>
                        <div className="control">
                            <div className="add_chat_trigger">
                                <Button onClick={() => addChat()} className='transparent'>
                                    <Icon name='solid_plus' className={`icon_s blue-lite`} />
                                </Button>
                            </div>
                        </div>
                    </div> */}

                    <div className="search">
                        {/*<div className="search-filter">*/}
                        {/*    <Button onClick={() => setSwitcher(!switcher)} className='transparent'>*/}
                        {/*        <Icon name='solid_cog' className={`icon_s ${switcher ? 'accent' : 'blue-lite'}`} />*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                        <div className="search-input">
                            <Search placeholder="Поиск..." value={searchText} onChange={(e) => onChange(e.target.value)} enterButton />
                        </div>
                    </div>

                    <Collapse bordered={false} accordion activeKey={switcher ? '1' : ''} >
                        <Panel header='' key="1">
                            <div className='channel-container'>
                                <div className='channel-item'>
                                    <Icon name='social_media_telegram' className='icon_s' />
                                    <Switch size="small" defaultChecked={channel['telegram']} onChange={() => onChangeSocial('telegram')} />
                                </div>
                                <div className='channel-item'>
                                    <Icon name='social_media_whatsapp' className='icon_s' />
                                    <Switch size="small" defaultChecked={channel['whatsapp']} onChange={() => onChangeSocial('whatsapp')} />
                                </div>
                                <div className='channel-item'>
                                    <Icon name='social_media_viber' className='icon_s' />
                                    <Switch size="small" defaultChecked={channel['viber']} onChange={() => onChangeSocial('viber')} />
                                </div>
                                <div className='channel-item'>
                                    <Icon name='social_media_instagram' className='icon_s' />
                                    <Switch size="small" defaultChecked={channel['instagram']} onChange={() => onChangeSocial('instagram')} />
                                </div>
                                <div className='channel-item'>
                                    <Icon name='social_media_vkontakte' className='icon_s' />
                                    <Switch size="small" defaultChecked={channel['vkontakte']} onChange={() => onChangeSocial('vkontakte')} />
                                </div>
                                <div className='channel-item'>
                                    <Icon name='social_media_facebook' className='icon_s' />
                                    <Switch size="small" defaultChecked={channel['facebook']} onChange={() => onChangeSocial('facebook')} />
                                </div>
                                <div className='channel-item'>
                                    <Icon name='social_media_odnoklassniki' className='icon_s' />
                                    <Switch size="small" defaultChecked={channel['odnoklassniki']} onChange={() => onChangeSocial('odnoklassniki')} />
                                </div>
                                <div className='channel-item'>
                                    <Icon name='social_media_email' className='icon_s' />
                                    <Switch size="small" defaultChecked={channel['email']} onChange={() => onChangeSocial('email')} />
                                </div>
                            </div>
                            <div className="type_container">
                                <Radio.Group onChange={onChangeSocial} defaultValue="all" >
                                    <Radio.Button className='radio_btn all ' value="all">
                                        <Icon name='solid_star-of-life' className='blue-lite ' />
                                    </Radio.Button>
                                    <Radio.Button className='radio_btn' value="comments">Коментарии</Radio.Button>
                                    <Radio.Button className='radio_btn' value="msg">Сообщения</Radio.Button>
                                    <Radio.Button className='radio_btn' value="request">Заявки</Radio.Button>
                                </Radio.Group>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </Fragment >

        );
    }));

export default Search;
