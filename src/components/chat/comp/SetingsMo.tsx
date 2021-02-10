import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import IStores, {IChatStore} from '@stores/interface';
import {Collapse, Modal} from 'antd';
import {MoreOutlined, FormOutlined} from "@ant-design/icons";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type IProps = {
    chatStore?: IChatStore,
    id?: string,
    chat_id: string,
    switcherOff: () => void;
}

const SetingsMo = inject((stores: IStores) => ({chatStore: stores.chatStore}))(
    observer((props: IProps) => {

        const {Panel} = Collapse;
        const listData = [
            [{
                id: 1, title: 'Обшее', data: [
                    {id: 1, name: 'фио + тел'},
                    {id: 2, name: 'фио + тел'},
                    {id: 3, name: 'фио + тел'},
                    {id: 4, name: 'фио + тел'}
                ]
            }, {
                id: 2, title: 'Обшее', data: [
                    {id: 1, name: 'фио + тел'},
                    {id: 2, name: 'фио + тел'},
                    {id: 3, name: 'фио + тел'},
                    {id: 4, name: 'фио + тел'}
                ]
            }, {
                id: 3, title: 'Обшее', data: [
                    {id: 1, name: 'фио + тел'},
                    {id: 2, name: 'фио + тел'},
                    {id: 3, name: 'фио + тел'},
                    {id: 4, name: 'фио + тел'}
                ]
            }, {
                id: 4, title: 'Обшее', data: [
                    {id: 1, name: 'фио + тел'},
                    {id: 2, name: 'фио + тел'},
                    {id: 3, name: 'фио + тел'},
                    {id: 4, name: 'фио + тел'}
                ]
            },],
            [{
                id: 5, title: 'Обшее', data: [
                    {id: 1, name: 'фио + тел'},
                    {id: 2, name: 'фио + тел'},
                    {id: 3, name: 'фио + тел'},
                    {id: 4, name: 'фио + тел'}
                ]
            }, {
                id: 6, title: 'Обшее', data: [
                    {id: 1, name: 'фио + тел'},
                    {id: 2, name: 'фио + тел'},
                    {id: 3, name: 'фио + тел'},
                    {id: 4, name: 'фио + тел'}
                ]
            }, {
                id: 7, title: 'Обшее', data: [
                    {id: 1, name: 'фио + тел'},
                    {id: 2, name: 'фио + тел'},
                    {id: 3, name: 'фио + тел'},
                    {id: 4, name: 'фио + тел'}
                ]
            }, {
                id: 8, title: 'Обшее', data: [
                    {id: 1, name: 'фио + тел'},
                    {id: 2, name: 'фио + тел'},
                    {id: 3, name: 'фио + тел'},
                    {id: 4, name: 'фио + тел'}
                ]
            },]
        ]
        const callback = (key) => {
            console.log(key, 789879);
        }

        const [isModalVisible, setIsModalVisible] = useState(false);

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleOk = () => {
            setIsModalVisible(false);
        };

        const handleCancel = () => {
            setIsModalVisible(false);
        };
        return (
            <>
                <div>
                    <div className='seting_menu_header mb-3'>
                        <h4>быстрые ответы</h4>
                        <span onClick={showModal}>
                        <p>редактировать</p>
                        <FormOutlined/>
                    </span>
                    </div>
                    <div className='modal_seting_block '>
                        {listData.map(v => <Collapse onChange={callback} accordion>
                                {v.map(data =>
                                    <Panel header={data.title} key={data.id}>
                                        {data.data.map(val => <span key={val.id}
                                                                    className='list_block d-flex justify-content-between align-items-center mb-1'>
                                <p className='mb-0'>{val.name}</p> <MoreOutlined/>
                            </span>)}
                                    </Panel>)}
                            </Collapse>
                        )}
                    </div>
                </div>
                <div className='d-flex buttons_block align-items-center'>
                    <button>456456</button>
                    <button>456456</button>
                    <button>456456</button>
                    <button>456456</button>
                    <button>456456</button>
                </div>
                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        );
    }));

export default SetingsMo;
