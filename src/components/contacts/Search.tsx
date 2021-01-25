import React, { useState, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IContactStore } from '@stores/interface';
import { Input, Radio, Switch, Collapse } from 'antd'

import './Contact.scss'
import { Icon } from '@ui'


type IProps = {
    contactStore?: IContactStore
}

const Search = inject((stores: IStores) => ({ contactStore: stores.contactStore }))(
    observer((props: IProps) => {

        const { contactStore } = props;
        const [searchText, setSearchText] = useState('')
        const [switcher, setSwitcher] = useState(false)


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






        const { Panel } = Collapse;
        const { Search } = Input;

        return (
            <Fragment>

                <div className="search">
                    <div onClick={() => setSwitcher(!switcher)} className="search-filter">
                        <Icon name='solid_sliders-h' className={`icon_s ${switcher ? 'accent' : 'blue-lite'}`} />
                    </div>
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
                                <Switch size="small" defaultChecked={channel['instangram']} onChange={() => onChangeSocial('instangram')} />
                            </div>
                            <div className='channel-item'>
                                <Icon name='social_media_vk' className='icon_s' />
                                <Switch size="small" defaultChecked={channel['vk']} onChange={() => onChangeSocial('vk')} />
                            </div>
                            <div className='channel-item'>
                                <Icon name='social_media_facebook' className='icon_s' />
                                <Switch size="small" defaultChecked={channel['facebook']} onChange={() => onChangeSocial('facebook')} />
                            </div>
                            <div className='channel-item'>
                                <Icon name='social_media_ok' className='icon_s' />
                                <Switch size="small" defaultChecked={channel['ok']} onChange={() => onChangeSocial('ok')} />
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

            </Fragment >

        );
    }));

export default Search;
