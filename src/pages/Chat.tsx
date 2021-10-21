import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import { Row, Col, Layout } from "antd";
import { ChatLayout, ContactsLayout } from "@/layouts";
import "@/styles/index.scss";
import { useStore } from "@/stores";
import { useLocationQuery } from "@/hooks/useLocationQuery";
import { Sidebar } from "@/pages/Sidebar";

const App = observer(() => {
  const { layoutStore, contactStore, sidebarStore } = useStore();
  const query = useLocationQuery();
  const sidebarOpenedByDefault = useMediaQuery({ minWidth: 1024 });
  const id = useMemo(() => Number(query.get("im")), [query]);

  useEffect(() => {
    if (contactStore.isLoaded && contactStore.hasContact(id)) {
      contactStore.setActiveContact(contactStore.getContact(id));
      layoutStore.setLayout("chat");
      sidebarStore.setOpened(sidebarOpenedByDefault);
    }
  }, [contactStore.isLoaded]);

  const withSidebar =
    sidebarStore.opened && query.get("im") && contactStore.hasContact(id);

  return (
    <Layout hasSider={true} className="chat_page">
      <Row>
        <Col
          xs={layoutStore.layout === "contact" ? 24 : 0}
          sm={layoutStore.layout === "contact" ? 24 : 0}
          md={10}
          lg={7}
          xl={7}
          xxl={6}
          style={{ height: "100%" }}
        >
          <ContactsLayout />
        </Col>

        <Col
          xs={layoutStore.layout === "chat" && !withSidebar ? 24 : 0}
          sm={layoutStore.layout === "chat" && !withSidebar ? 24 : 0}
          md={withSidebar ? 0 : 14}
          lg={withSidebar ? 10 : 17}
          xl={withSidebar ? 11 : 17}
          xxl={withSidebar ? 13 : 18}
        >
          <ChatLayout />
        </Col>

        <Col
          xs={layoutStore.layout === "chat" && withSidebar ? 24 : 0}
          sm={layoutStore.layout === "chat" && withSidebar ? 24 : 0}
          md={layoutStore.layout === "chat" && withSidebar ? 14 : 0}
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
