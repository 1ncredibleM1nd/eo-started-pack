import React from 'react'
import { inject, observer, } from "mobx-react";
import {
    Avatar, Col, Menu, Row, Button, Dropdown, Space,
    DatePicker
} from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Icon, } from '@ui'

import './User.scss'
import IStores, { IContactStore, IUserStore } from "@stores/interface";
import SelectCategories from "@components/user_info/SelectCategories";
import ComentsBlock from "@components/user_info/ComentsBlock";

type IProps = {
    contactStore?: IContactStore,
    userStore?: IUserStore
}

const User = inject((stores: IStores) => ({ contactStore: stores.contactStore, }))(
    observer((props: IProps) => {


        //const {contactStore} = props;
        //    let activeContact = contactStore.activeContact
        //
        // const filter = contactStore.filter
        // let channel: any


        // const handleButtonClick = (e) => {
        //     message.info('Click on left button.');
        //     console.log('click left button', e);
        // }

        const handleMenuClick = (e: {}) => {
            console.log('click', e);
        }

        const menu = <Menu onClick={e => handleMenuClick(e)}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                1st menu item
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                3rd menu item
            </Menu.Item>
        </Menu>;
        const onChange = (date: {}, dateString: string) => {
            console.log(date, dateString);
        }


        return (
            <div className='user_info_block p-3'>
                <Row>
                    <Col span={5}>
                        <div className="avatar">
                            <Avatar size={64} icon={<UserOutlined />} />
                        </div>
                    </Col>
                    <Col span={15}>
                        <div className='user_info'>
                            <span className='user_information'>Россия Москва</span>
                            <span className='user_information'>21 год</span>
                            <span className='user_information'>+7(999) 585-87-81</span>
                            <a className='mor_info' href="#">показать болше информации</a>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className='d-flex flex-column'>
                            <div className='d-flex align-items-center justify-content-end mb-1'>
                                <span className='mr-2'>10M</span>
                                <Icon name='social_media_odnoklassniki' className='icon_s' />
                            </div>
                            <div className='d-flex align-items-center justify-content-end mb-1'>
                                <span className='online_in mr-2' />
                                <Icon name='social_media_instagram' className='icon_s' />
                            </div>
                            <div className='d-flex align-items-center justify-content-end'>
                                <span className='mr-2'>1h</span>
                                <Icon name='social_media_facebook' className='icon_s' />
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className='user_dropdawn d-flex justify-content-between mt-4'>
                    <div className='user_name'>
                        <span>Влад Иваненко</span>
                    </div>
                    <Space>
                        <Dropdown overlay={menu}>
                            <Button>
                                <span className='dropdawn_menu'>
                                    <p>  готов к покупке </p>
                                    <DownOutlined />
                                </span>
                            </Button>
                        </Dropdown>
                    </Space>
                </div>
                <div className='mt-4'>
                    <SelectCategories />
                </div>
                <div className='mt-2 '>
                    <p className='mb-1'>Дата контакта</p>
                    <Space direction="vertical">
                        <DatePicker onChange={onChange} />
                    </Space>
                </div>
                <div className='mt-2 d-flex justify-content-between align-items-center'>
                    <div className='w-25'>
                        <h4 className='mb-0'>Менеджер</h4>
                    </div>
                    <div className='w-75 d-flex justify-content-end'>
                        <Space>
                            <Dropdown overlay={menu}>
                                <Button className='d-flex align-items-center'>
                                    <span className='mr-3'> Александр Петров</span> <DownOutlined />
                                </Button>
                            </Dropdown>
                        </Space>
                    </div>

                </div>
                <div className="mt-3 border">
                    <ComentsBlock />
                </div>
            </div>
        )
    }))
export default User