import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Layout } from "antd";
import { ChatLayout, ContactsLayout } from "@/layouts";
import "@/styles/index.scss";
import { useStore } from "@/stores";
import { useLocationQuery } from "@/hooks/useLocationQuery";

const App = observer(() => {
  const { appStore, contactStore } = useStore();
  const layout = appStore.layout;
  const query = useLocationQuery();

  useEffect(() => {
    const id = query.get("im");
    if (id && appStore.isLoaded) {
      contactStore.setActiveContact(id);
      appStore.setLayout("chat");
    }
  }, [query, appStore.isLoaded]);

  return (
    <Layout hasSider={true} className="chat_page">
      <Row>
        <Col
          xs={layout === "contact" ? 24 : 0}
          sm={layout === "contact" ? 24 : 0}
          md={10}
          lg={7}
          xl={6}
          xxl={6}
        >
          <ContactsLayout />
        </Col>
        <Col
          xs={layout === "chat" ? 24 : 0}
          sm={layout === "chat" ? 24 : 0}
          md={14}
          lg={17}
          xl={18}
          xxl={18}
        >
          <ChatLayout />
        </Col>
        {/*
                    // TODO: вернуть, когда будем готовы получать данные. См. коммит, чтобы увидеть исходные значения
                    <Col
                        xs={layout === 'info' ? 24 : 0}
                        sm={layout === 'info' ? 24 : 0}
                        md={layout === 'info' || layout === 'chat' ? 10 : 0}
                        lg={7} xl={6} xxl={6}>
                        <InfoLayout />
                    </Col>
                    */}
      </Row>
    </Layout>
  );
});

export default App;
