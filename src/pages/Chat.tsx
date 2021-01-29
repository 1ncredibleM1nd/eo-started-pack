
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Layout } from 'antd';
import { ChatLayout, InfoLayout, ContactsLayout } from '@layouts'
import IStores, { IAppStore } from '@stores/interface';
import '@styles/index.scss'

type IProps = {
    appStore?: IAppStore
}

const App = inject((stores: IStores) => ({ appStore: stores.appStore }))(
    observer((props: IProps) => {

        // const { appStore } = props;

        // const collapsed_info = appStore.info_tab

        // const [switcher, setSwitcher] = useState(false)

        // const { Sider } = Layout;





        return (
            <Layout hasSider={true} className='chat_page'>
                <Row>
                    {/* <div className={`contact_layout_container ${switcher ? 'active' : ''}`}> */}
                    <Col xs={24} sm={10} md={10} lg={7} xl={7}>
                        <ContactsLayout />
                    </Col>
                    {/* <div onClick={() => setSwitcher(!switcher)} className='contact_trigger'>Trigger</div>
                    </div> */}

                    <Col xs={24} sm={14} md={14} lg={10} xl={10}>
                        <ChatLayout />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={7} xl={7}>
                        <InfoLayout />
                    </Col>
                </Row>



            </Layout >
        );
    }));

export default App;
