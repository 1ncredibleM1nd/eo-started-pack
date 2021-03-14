import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import IStores, { IAppStore, IAuthStore } from '@stores/interface';
import Chats from '@pages/Chat'
import '@styles/index.scss'

type IProps = {
    appStore?: IAppStore
    authStore?: IAuthStore
}

const App = inject((stores: IStores) => ({ appStore: stores.appStore, authStore: stores.authStore }))(
    observer((props: IProps) => {
        const { appStore, authStore } = props;
        useEffect(() => {

            async function init() {
                await authStore.initialize()
                appStore.initialization();
            }

            init();
        }, []);

        return (
            <Layout>
                <Layout className="site-layout">
                    <div className="chats-tab-open h-100">
                        <div className={"main-layout h-100"}>
                            <Chats />
                            {/*<NavBarLayout /> */}
                        </div>
                    </div>
                </Layout>
            </Layout>
        );
    }));

export default App;
