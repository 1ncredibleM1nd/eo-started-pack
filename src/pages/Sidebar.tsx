import { styled } from "goober";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { SidebarHeader } from "@/components/Sidebar/SidebarHeader";
import { SidebarUser } from "@/components/Sidebar/SidebarUser";
import { SidebarTagList } from "@/components/Sidebar/SidebarTagList";
import { SidebarTemplateAnswer } from "@/components/Sidebar/SidebarTemplateAnswer";
import { Tabs } from "antd";
import { Icon } from "@/ui/Icon/Icon";
import "./Sidebar.scss";
import { SidebarManagerSelector } from "@/components/Sidebar/SidebarManagerSelector/SidebarManagerSelector";
import SidebarTasks from "@/components/Sidebar/SidebarTasks";
import { css } from "goober";
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
  padding: 0;
  padding-bottom: 13px;
  overflow-y: scroll;

  @media (max-width: 480px) {
    padding-top: 0;
    height: calc(100vh - 60px);
  }
`;

const profileTabName = (
  <div
    className={css`
      display: flex;
      align-items: center;
    `}
  >
    <Icon fill={"currentColor"} name={"icon_profile"} />
    <span
      className={css`
        transform: translateY(1px);
      `}
    >
      Профиль
    </span>
  </div>
);
const tamplateTabName = (
  <div
    className={css`
      display: flex;
      align-items: center;
    `}
  >
    <Icon fill={"currentColor"} name={"icon_template"} />
    <span
      className={css`
        transform: translateY(1px);
      `}
    >
      Шаблоны
    </span>
  </div>
);

export const Sidebar = observer(() => {
  const { contactStore } = useStore();
  return (
    <SidebarWrapper>
      <SidebarHeader />
      <SidebarContent>
        <Tabs type="card" className="side-bar-tabs">
          <TabPane tab={profileTabName} key="1">
            <SidebarUser />
            <SidebarTagList />
            <SidebarManagerSelector />
            <SidebarTasks />
          </TabPane>
          <TabPane tab={tamplateTabName} key="2">
            <SidebarTemplateAnswer
              key={"st_" + contactStore.activeContact?.id}
            />
          </TabPane>
        </Tabs>
      </SidebarContent>
    </SidebarWrapper>
  );
});
