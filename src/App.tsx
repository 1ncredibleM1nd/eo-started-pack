import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { ChatLayout, InfoLayout, ContactsLayout } from '@layouts'
import IStores, { IAppStore } from '@stores/interface';

type IProps = {
    appStore?: IAppStore
}

const App = inject((stores: IStores) => ({ appStore: stores.appStore }))(
    observer((props: IProps) => {

        const { appStore } = props;

        console.log(appStore)

        useEffect(() => {
            async function init() {
                try {
                    await appStore.initialization();

                } catch (e) {
                    throw new Error(e);
                }
            }
            init();
        }, []);


        return (
            <Layout>
                <Layout className="site-layout">
                    <ContactsLayout />
                    <ChatLayout />
                    <InfoLayout />
                </Layout>
            </Layout>
        );
    }));

export default App;
