
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { ChatLayout, InfoLayout, ContactsLayout } from '@layouts'
import IStores, { IAppStore } from '@stores/interface';
import '@styles/index.scss'

type IProps = {
    appStore?: IAppStore
}

const App = inject((stores: IStores) => ({ appStore: stores.appStore }))(
    observer((props: IProps) => {

        const { appStore } = props;

        const collapsed_info = appStore.info_tab

        const { Sider } = Layout;

        return (
            <Layout hasSider={true} className='chat_page'>
                <ContactsLayout />
                <ChatLayout />
                <Sider width={300}
                    collapsedWidth={0} collapsible collapsed={collapsed_info !== 'info'} onCollapse={() => appStore.setInfoTab('info')}>
                    <InfoLayout />
                </Sider>
            </Layout>
        );
    }));

export default App;
