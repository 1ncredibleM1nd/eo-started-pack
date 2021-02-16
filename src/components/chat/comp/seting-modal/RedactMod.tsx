import {inject, observer} from "mobx-react";
import IStores, {IChatStore} from "@stores/interface";

import React, {useState} from "react";
import {Col, Row, Space, Input, Collapse} from "antd";
import {MoreOutlined} from '@ant-design/icons';

type IProps = {
    chatStore?: IChatStore,
    id?: string,
    chat_id: string,
    switcherOff: () => void;
}
let data;
const RedactMod = inject((stores: IStores) => ({chatStore: stores.chatStore}))(
    observer((props: IProps) => {
        const {Panel} = Collapse;
        const {Search} = Input;
        const [changData, setChangeData] = useState([])
        const [title, setTitle] = useState('')
        const [name, setName] = useState('')


        const createNewSelect = () => {
            data = [{
                id: Date.now(),
                title: title,
                data: [{id: Date.now(), name: name}]
            }]
            setChangeData([...data, ...changData])
        }
// @ts-ignore
        const handleSubmit = (e) => {
            e.preventDefault()
            let isPush = true
            if (title !== '' && name !== '') {
                if (changData.length !== 0) {
                    for (let i = 0; i < changData.length; i++) {
                        if (changData[i].title === title) {
                            changData[i].data.push({id: Date.now(), name})
                            setChangeData([...changData])
                            isPush = false
                            break;
                        }
                    }
                    if (isPush) {
                        createNewSelect()
                    }
                } else {
                    createNewSelect()
                }

            }
        }


        return (
            <Row>
                <Col span={8}>
                    <div className='w-100 right_block'>
                        <Space direction="vertical" className='w-75'>
                            <Search placeholder="input search text"
                                    className='search_input'
                            />
                        </Space>
                    </div>
                    <div className='modal_seting_block '>
                        {changData.length !== 0 ? <Collapse accordion>
                                {changData.map(data =>
                                    <Panel header={data.title} key={data.id}>
                                        {data.data.map((val: { id: number, name: string }) => <span key={val.id}
                                                                                                    className='list_block d-flex justify-content-between align-items-center mb-1'>
                                <p className='mb-0'>{val.name}</p> <MoreOutlined/>
                            </span>)}
                                    </Panel>)}
                            </Collapse>
                            : ''}
                    </div>
                </Col>
                <Col span={8} className='border-right border-left'>
                    <div className='create_cat_block'>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className='d-flex flex-column w-100 mb-2'>
                                <input
                                    type="text"
                                    className='mb-2'
                                    name="cat_name"
                                    value={title}
                                    placeholder='название папки для атветов'
                                    onChange={e => setTitle(e.target.value)}

                                />
                                <input
                                    type="text"
                                    name="cat"
                                    value={name}
                                    placeholder='быстрые ответы '
                                    onChange={e => setName(e.target.value)}

                                />
                            </div>
                            <button className='btn btn-info ml-1'>дабавить</button>
                        </form>
                    </div>
                </Col>
                <Col span={8}>
                    <h2>hello</h2>

                </Col>
            </Row>
        );


    }));

export default RedactMod;