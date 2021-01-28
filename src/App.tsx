import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import IStores, { IAppStore } from '@stores/interface';
import Chats from '@pages/Chat'
import { NavBarLayout } from '@layouts'
import '@styles/index.scss'

type IProps = {
    appStore?: IAppStore
}

const App = inject((stores: IStores) => ({ appStore: stores.appStore }))(
    observer((props: IProps) => {

        const { appStore } = props;

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
                    <div className="chats-tab-open h-100">
                        <div className={"main-layout h-100"}>
                            <Chats />
                            <NavBarLayout />
                        </div>
                    </div>
                </Layout>
            </Layout>
        );
    }));

export default App;
