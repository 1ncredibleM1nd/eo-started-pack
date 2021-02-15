import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import IStores from "@stores/interface";
import './ComentsBlock.scss'
import {Avatar, Checkbox, Input, DatePicker,} from 'antd';
import {MoreOutlined, CheckOutlined} from '@ant-design/icons';


const data: any = [
    {
        id: 1,
        avatar: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.amet, consectetur adipisicing elit.amet, consectetur adipisicing elit.amet, consectetur adipisicing elit.amet, consectetur adipisicing elit.amet, consectetur adipisicing elit.',
        date: new Date()
    },
    {
        id: 2,
        avatar: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        date: new Date()
    },
]
const options = [
    {label: 'Совершить контакт', date: '20:40  27.10.2021', check: false},
    {label: 'Напомнить о покупке', date: '20:40  27.10.2021', check: false},
    {
        label: 'Роскозать о акции.Баланс спроса и продажы усиливает криволинейны интервал',
        date: '20:40 27.10.2021',
        check: false
    },
];

const ComentsBlock = inject((stores: IStores) => ({ contactStore: stores.contactStore }))(
    observer(() => {
            const tascsCategories: [{ id: number, title: string, isActive: boolean, sty: string }, { id: number, title: string, isActive: boolean, sty: string }] = [
                {id: 1, title: 'Коментарии', isActive: true, sty: 'border-right'},
                {id: 2, title: 'Задачи', isActive: false, sty: ''}
            ]
            const [isActive, setIsActive] = useState(tascsCategories)
            const [isOpen, setIsOpen] = useState(true)
            const [optionsList, setOpList] = useState(options)
            const [openModal, setOpenModal] = useState(false)


            const changeList = (id: number, ind: number) => {
                for (let i = 0; i < tascsCategories.length; i++) {
                    tascsCategories[i].isActive = tascsCategories[i].id === id ? true : false
                }
                if (tascsCategories[ind].title === 'Коментарии') {
                    setIsOpen(true)
                } else {
                    setIsOpen(false)
                }
                // @ts-ignore
                setIsActive([...tascsCategories])
            }
            const onChange = (checkedValues: any, index: number) => {
                options[index].check = !options[index].check
                setOpList([...options])
            }

            const {TextArea} = Input;
            return (<div className={`coments_block pt-2 ${openModal ? 'active_messages' : ''}`}>
                    <div className='d-flex mb-2'>
                        {isActive.map((v, index) => <span
                            key={v.id}
                            className={`w-50 text-center ${v.sty}`}
                            style={{color: v.isActive ? '#59ABE2' : ''}}
                            onClick={openModal ? null : () => changeList(v.id, index)}
                        >{v.title}</span>)
                        }
                    </div>
                    {isOpen ? <div className='coments mt-2 p-2'>
                            {data.map((val:any) =>
                                    <div className='comments_container mb-2 rela' key={val.id}>
                                        <p>{val.description}</p>
                                        <span className='avatar_block'>
                                   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            </span>
                                    </div>
                            )}
                            <div className='d-flex justify-content-center  mt-5 mb-2'>
                                <button className='btm btn-info'>+</button>
                            </div>
                        </div>
                        : <div className='d-flex flex-column chak_ant'>
                            {optionsList.map((op, i) => <div className='d-flex mb-1' key={i}>
                                <Checkbox onChange={(e) => onChange(e, i)}>
                                    <span className={op.check ? 'text_chekin' : ''}>{op.label}</span>
                                </Checkbox>
                                <div className='data_block'>
                                    <span>{op.date}</span>
                                    <MoreOutlined
                                        twoToneColor='#91d5ff'
                                    />
                                </div>
                            </div>) || ""}
                            <div className='position-relative mt-1 mb-2'>
                                {openModal ? <div className="message-item">
                                    <div className="message-block-content d-flex flex-column">
                                        <TextArea rows={7}/>
                                        <div className='d-flex justify-content-between mt-1'>
                                            <DatePicker/>
                                            <DatePicker picker='time'/>
                                        </div>
                                    </div>
                                </div> : ''}
                                <div className='d-flex justify-content-center mt-3'>
                                    <button className='btm btn-info' onClick={() => setOpenModal(!openModal)}>
                                        {!openModal ? '+' : <CheckOutlined/>}</button>
                                </div>
                            </div>

                        </div>}
                </div>)

        }
    ))
export default ComentsBlock