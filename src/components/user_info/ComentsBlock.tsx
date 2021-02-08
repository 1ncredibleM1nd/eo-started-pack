import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import IStores from "@stores/interface";
import './ComentsBlock.scss'
import {Avatar, Button, Checkbox} from 'antd';

const data: [{ id: number, avatar: string, description: string, date: object }] = [
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

const ComentsBlock = inject((stores: IStores) => ({contactStore: stores.contactStore}))(
    observer(() => {
        const tascsCategories: [{ id: number, title: string, isActive: boolean, sty: string }] = [
            {id: 1, title: 'Коментарии', isActive: true, sty: 'border-right'},
            {id: 2, title: 'Задачи', isActive: false, sty: ''}
        ]
        const options = [
            {label: 'Apple', value: 'Apple'},
            {label: 'Pear', value: 'Pear'},
            {label: 'Orange', value: 'Orange'},
        ];
        const [isActive, setIsActive] = useState(tascsCategories)
        const [isOpen, setisOpen] = useState(true)

        const changeList = (id: number, ind: number) => {
            for (let i = 0; i < tascsCategories.length; i++) {
                tascsCategories[i].isActive = tascsCategories[i].id === id ? true : false
            }
            if (tascsCategories[ind].title === 'Коментарии') {
                setisOpen(true)
            } else {
                setisOpen(false)
            }
            setIsActive([...tascsCategories])
        }
        const onChange = (checkedValues: any) => {
            console.log('checked = ', checkedValues);
        }
        return (
            <div className='coments_block'>
                <div className='d-flex'>
                    {isActive.map((v, index) => <span
                        key={v.id}
                        className={`w-50 text-center ${v.sty}`}
                        style={{color: v.isActive ? '#59ABE2' : ''}}
                        onClick={() => changeList(v.id, index)}
                    >{v.title}</span>)
                    }
                </div>
                {isOpen ? <div className='coments mt-2 p-2'>
                        {data.map(val =>
                            <div className='comments_container mb-2 rela'>
                                <p>{val.description}</p>
                                <span className='avatar_block'>
                                   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            </span>
                            </div>
                        )}
                        <div className='d-flex justify-content-center'>
                            <button className='btm btn-info'>+</button>
                        </div>
                    </div>
                    : <div>
                        <Checkbox.Group
                            options={options}
                            defaultValue={['Pear']}
                            onChange={onChange}
                            className='d-flex flex-column'
                        />
                        <div>

                        </div>
                    </div>}
            </div>
        )

    }))
export default ComentsBlock