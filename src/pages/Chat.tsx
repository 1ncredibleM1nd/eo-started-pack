
import React from 'react';
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

        const { Sider } = Layout;

        return (
            <Layout hasSider={true} className='chat_page'>
                <Row>
                    <Col xs={0} sm={10} md={10} lg={8} xl={8}>
                        <ContactsLayout />
                    </Col>
                    <Col xs={24} sm={14} md={14} lg={11} xl={11}>
                        <ChatLayout />
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={6} xl={6}>
                        <InfoLayout />
                    </Col>
                </Row>



            </Layout>
        );
    }));

export default App;
