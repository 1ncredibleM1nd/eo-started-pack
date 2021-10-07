import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Layout } from "antd";
import { ChatLayout, ContactsLayout } from "@/layouts";
import "@/styles/index.scss";
import { useStore } from "@/stores";
import { useLocationQuery } from "@/hooks/useLocationQuery";
import { Sidebar } from "@/pages/Sidebar";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

const App = observer(() => {
  const { appStore, contactStore, sidebarStore } = useStore();
  const { layout } = appStore;
  const query = useLocationQuery();
  const id = useMemo(() => Number(query.get("im")), [query]);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (contactStore.isLoaded && contactStore.hasContact(id)) {
      contactStore.setActiveContact(contactStore.getContact(id));
      sidebarStore.setOpened(!isMobile());
      appStore.setLayout("chat");
    }
  }, [contactStore.isLoaded]);

  const withSidebar =
    sidebarStore.opened && query.get("im") && contactStore.hasContact(id);

  return (
    <Layout hasSider={true} className="chat_page">
      <Row>
        <Col
          xs={layout === "contact" ? 24 : 0}
          sm={layout === "contact" ? 24 : 0}
          md={10}
          lg={7}
          xl={7}
          xxl={6}
          style={{ height: "100%" }}
        >
          <ContactsLayout />
        </Col>

        <Col
          xs={layout === "chat" && !withSidebar ? 24 : 0}
          sm={layout === "chat" && !withSidebar ? 24 : 0}
          md={layout === "chat" && !withSidebar ? 14 : 0}
          lg={withSidebar ? 10 : 17}
          xl={withSidebar ? 11 : 17}
          xxl={withSidebar ? 13 : 18}
        >
          <ChatLayout />
        </Col>

        <Col
          xs={layout === "chat" && withSidebar ? 24 : 0}
          sm={layout === "chat" && withSidebar ? 24 : 0}
          md={layout === "chat" && withSidebar ? 14 : 0}
          lg={7}
          xl={6}
          xxl={5}
        >
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  );
});

export default App;
