import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Layout } from "antd";
import { ChatLayout, ContactsLayout } from "@/layouts";
import "@/styles/index.scss";
import { useStore } from "@/stores";
import { useLocationQuery } from "@/hooks/useLocationQuery";
import { Sidebar } from "@/layouts/Sidebar";

const App = observer(() => {
  const { appStore, contactStore, sidebarStore } = useStore();
  const layout = appStore.layout;
  const query = useLocationQuery();
  const id = useMemo(() => query.get("im"), [query]);

  useEffect(() => {
    if (appStore.isLoaded && contactStore.hasContact(id)) {
      contactStore.setActiveContact(id);
      appStore.setLayout("chat");
    }
  }, [appStore.isLoaded]);

  const withSidebar =
    sidebarStore.opened &&
    appStore.isLoaded &&
    query.get("im") &&
    contactStore.hasContact(id);

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
          style={{ height: "100%" }}
        >
          <ContactsLayout />
        </Col>
        <Col
          xs={layout === "chat" ? 24 : 0}
          sm={layout === "chat" ? 24 : 0}
          md={layout === "chat" ? 14 : 0}
          lg={withSidebar ? 10 : 17}
          xl={withSidebar ? 11 : 18}
          xxl={withSidebar ? 13 : 18}
        >
          <ChatLayout />
        </Col>
        {withSidebar && (
          <Col
            xs={layout === "info" ? 24 : 0}
            sm={layout === "info" ? 24 : 0}
            md={layout === "info" ? 14 : 0}
            lg={7}
            xl={7}
            xxl={5}
          >
            <Sidebar />
          </Col>
        )}
      </Row>
    </Layout>
  );
});

export default App;
