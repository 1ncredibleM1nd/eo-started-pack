import { observer } from "mobx-react-lite";
import { ReactNode, useState } from "react";
import ContactLayout from "@/layouts/ContactsLayout";
import ConversationTaskLayout from "@/layouts/ConversationTaskLayout";
import { css, styled } from "goober";
import { Icon } from "@/ui/Icon/Icon";

const TABS_KEY = {
  Contacts: "contacts",
  Tasks: "Tasks",
};

const TabContainer = styled("div")`
  height: 100%;
`;

const TabHeader = styled("div")`
  display: flex;
  height: 60px;
  background: #f4f5f6;
  align-items: center;
  padding: 15px;
`;

const profileTabName = (
  <>
    <Icon fill={"currentColor"} name={"icon_profile"} />{" "}
    <span
      className={css`
        margin-left: 5px;
      `}
    >
      Диалоги
    </span>
  </>
);

const tamplateTabName = (
  <>
    <Icon fill={"currentColor"} name={"icon_template"} />{" "}
    <span
      className={css`
        margin-left: 5px;
      `}
    >
      Задачи
    </span>
  </>
);

const TabPane = observer(
  ({ visible, children }: { visible: boolean; children: ReactNode }) => {
    return (
      <div
        className={css`
          display: ${visible ? "block" : "none"};
          height: calc(100% - 60px);
        `}
      >
        {children}
      </div>
    );
  }
);

type TPropsTabHeaderItem = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const TabHeaderItem = observer(
  ({ onClick, title, active }: TPropsTabHeaderItem) => {
    return (
      <div
        onClick={onClick}
        className={css`
          padding: 10px;
          cursor: pointer;
          color: ${active ? "#1890ff" : "black"};
          display: flex;
        `}
      >
        {title}
      </div>
    );
  }
);

export const ContactsTab = observer(() => {
  const [activeTabKey, setActiveTabKey] = useState(TABS_KEY.Contacts);

  return (
    <TabContainer>
      <TabHeader>
        <TabHeaderItem
          title={profileTabName}
          active={activeTabKey === TABS_KEY.Contacts}
          onClick={() => setActiveTabKey(TABS_KEY.Contacts)}
        />
        <TabHeaderItem
          title={tamplateTabName}
          active={activeTabKey === TABS_KEY.Tasks}
          onClick={() => setActiveTabKey(TABS_KEY.Tasks)}
        />
      </TabHeader>

      <TabPane visible={activeTabKey === TABS_KEY.Contacts}>
        <ContactLayout />
      </TabPane>
      <TabPane visible={activeTabKey === TABS_KEY.Tasks}>
        <ConversationTaskLayout />
      </TabPane>
    </TabContainer>
  );
});
