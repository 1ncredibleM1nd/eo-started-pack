import { styled } from "goober";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css } from "goober";
import { SidebarHeader } from "@/components/Sidebar/SidebarHeader";
import { SidebarUser } from "@/components/Sidebar/SidebarUser";
import { SidebarTagList } from "@/components/Sidebar/SidebarTagList";
import { SidebarTemplateAnswer } from "@/components/Sidebar/SidebarTemplateAnswer";
import { Tabs } from "antd";
import { Icon } from "@/ui/Icon/Icon";
import "./Sidebar.scss";
import { SidebarManagerSelector } from "@/components/Sidebar/SidebarManagerSelector/SidebarManagerSelector";
import SidebarTasks from "@/components/Sidebar/SidebarTasks";
import { SidebarCommentList } from "@/components/Comments/Sidebar/SidebarCommentList";
const { TabPane } = Tabs;

const SidebarWrapper = styled("div")`
  background-color: #f4f5f6;
  border-left: 1px solid #e6ebeb;

  @media (max-width: 1024px) {
    border-left: none;
  }
`;

const SidebarContent = styled("div")`
  height: 100vh;
  padding: 0 0 13px;
  overflow-y: scroll;

  @media (max-width: 480px) {
    padding-top: 0;
    height: calc(100vh - 60px);
  }
`;

type TTabContentProps = {
  title: string;
  icon: string;
};

const TabContent = observer(({ icon, title }: TTabContentProps) => {
  return (
    <div
      className={css`
        display: flex;
        align-items: center;
      `}
    >
      <Icon fill={"currentColor"} name={icon} />
      <span
        className={css`
          transform: translateY(1px);
        `}
      >
        {title}
      </span>
    </div>
  );
});

export const Sidebar = observer(() => {
  const { contactStore } = useStore();

  return (
    <SidebarWrapper key={"sidebar_" + contactStore.activeContactId}>
      <SidebarHeader />
      <SidebarContent>
        <Tabs type="card" className="side-bar-tabs" destroyInactiveTabPane>
          <TabPane
            tab={<TabContent title={"Профиль"} icon={"icon_profile"} />}
            key={"tab-profile"}
          >
            <SidebarUser />
            <SidebarTagList />
            <SidebarManagerSelector />
            <SidebarTasks />
          </TabPane>
          <TabPane
            tab={<TabContent title={"Шаблоны"} icon={"icon_template"} />}
            key={"tab-template"}
          >
            <SidebarTemplateAnswer />
          </TabPane>
          <TabPane
            tab={<TabContent title={"Комментарии"} icon={"icon_comment"} />}
            key={"tab-comments"}
          >
            <SidebarCommentList conversationId={contactStore.activeContactId} />
          </TabPane>
        </Tabs>
      </SidebarContent>
    </SidebarWrapper>
  );
});
