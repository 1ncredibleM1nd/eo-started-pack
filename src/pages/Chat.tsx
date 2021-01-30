
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

        const { appStore } = props;

        const layout = appStore.layout

        // const collapsed_info = appStore.info_tab

        // const [switcher, setSwitcher] = useState(false)

        // const { Sider } = Layout;





        return (
            <Layout hasSider={true} className='chat_page'>
                <Row>
                    {/* <div className={`contact_layout_container ${switcher ? 'active' : ''}`}> */}
                    <Col
                        xs={layout === 'contact' ? 24 : 0}
                        sm={layout === 'contact' ? 24 : 0}
                        md={layout === 'contact' ? 10 : 0}
                        lg={6} xl={6}>
                        <ContactsLayout />
                    </Col>
                    {/* <div onClick={() => setSwitcher(!switcher)} className='contact_trigger'>Trigger</div>
                    </div> */}

                    <Col
                        xs={layout === 'chat' ? 24 : 0}
                        sm={layout === 'chat' ? 24 : 0}
                        md={14}
                        lg={12} xl={12}>
                        <ChatLayout />
                    </Col>
                    <Col
                        xs={layout === 'info' ? 24 : 0}
                        sm={layout === 'info' ? 24 : 0}
                        md={layout === 'info' ? 10 : 0}
                        lg={6} xl={6} >
                        <InfoLayout />
                    </Col>
                </Row>



            </Layout >
        );
    }));

export default App;
