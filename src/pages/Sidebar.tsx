import { styled } from "goober";
import { observer } from "mobx-react-lite";
import { SidebarHeader } from "@/components/Sidebar/SidebarHeader";
import { SidebarUser } from "@/components/Sidebar/SidebarUser";
import { SidebarTagList } from "@/components/Sidebar/SidebarTagList";
import { SidebarManagerSelector } from "@/components/Sidebar/SidebarManagerSelector/SidebarManagerSelector";
import SidebarTasks from "@/components/Sidebar/SidebarTasks";

const SidebarWrapper = styled("div")`
  background-color: #f4f5f6;
  border-left: 1px solid #e6ebeb;

  @media (max-width: 1024px) {
    border-left: none;
  }
`;

const SidebarContent = styled("div")`
  height: 100vh;
  padding: 15px 10px;
  padding-bottom: 13px;
  overflow-y: scroll;

  @media (max-width: 480px) {
    padding-top: 0;
    height: calc(100vh - 60px);
  }
`;

export const Sidebar = observer(() => {
  return (
    <SidebarWrapper>
      <SidebarHeader />
      <SidebarContent>
        <SidebarUser />
        <SidebarTagList />
        <SidebarManagerSelector />
        <SidebarTasks />
      </SidebarContent>
    </SidebarWrapper>
  );
});
