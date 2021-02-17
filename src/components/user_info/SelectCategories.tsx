import React, {useState} from 'react'
import {Button, Modal} from 'antd';
import {inject, observer} from "mobx-react";
import IStores from "@stores/interface";


import './SelectCategories.scss'

let rendList: any = []

const SelectCategories = inject((stores: IStores) => ({contactStore: stores.contactStore}))(
    observer(() => {
        const categoriesModal: { id: number, title: string, select: boolean, background: string }[] = [
            {id: 1, title: 'кат аксесуары', select: false, background: '#F5AE3F'},
            {id: 2, title: 'постоянный клик', select: false, background: '#78BC87'},
            {id: 3, title: 'сложны', select: false, background: '#5AABE2'},
            {id: 4, title: '100% продажа', select: false, background: '#DE7466'},
        ]
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [rendChat, setRendCaht] = useState([])

        const showModal = () => {
            setIsModalVisible(true);
        };
        const handleOk = () => {
            setIsModalVisible(false);
            setRendCaht(rendList)
        };
        const handleCancel = () => {
            setIsModalVisible(false);
        };
        const selectCategories = (id: number, index: number) => {
            let data = categoriesModal.filter(v => v.id === id)
            for (let i = 0; i < rendList.length; i++) {
                if (rendList[i].id === id) {
                    rendList.splice(i, 1)
                    return
                }
            }

            rendList.push(...data)
        }

        return (
            <div className='d-flex'>
                <Button className='create_categories_btn'
                        onClick={showModal}
                >
                    <span className='create_categories'>+</span>
                </Button>
                <Modal title="Create Categories"
                       visible={isModalVisible}
                       onOk={handleOk}
                       onCancel={handleCancel}>
                    <div>
                        {categoriesModal.map((title, index) =>
                            <Button key={title.id}
                                    className={`mr-1 mt-1 ${title.select ? 'active' : ''}`}
                                    onClick={() => selectCategories(title.id, index)}
                            >
                                {title.title}</Button>)}
                    </div>
                </Modal>
                <div className='d-flex flex-wrap w-100'>
                    {rendChat.map((v, i) => <span
                            className='selectead_categories ml-1 mb-1'
                            style={{
                                background: v.background,
                                borderColor: v.background
                            }}
                            key={i}
                        >
                        {v.title}
                    </span>
                    ) || ''}
                </div>

            </div>
        )
    }))
export default SelectCategories