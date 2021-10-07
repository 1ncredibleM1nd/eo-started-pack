import { styled } from "goober";
import { observer } from "mobx-react-lite";
import { SidebarHeader } from "@/components/Sidebar/SidebarHeader";
import { SidebarUser } from "@/components/Sidebar/SidebarUser";
import { SidebarTagList } from "@/components/Sidebar/SidebarTagList";

const SidebarWrapper = styled("div")`
  background-color: #f4f5f6;
  border-left: 1px solid #e6ebeb;

  @media (max-width: 480px) {
    border-left: none;
  }
`;

const SidebarContent = styled("div")`
  height: calc(100vh - 60px);
  padding: 15px 10px;
  padding-bottom: 13px;
  overflow-y: scroll;

  @media (max-width: 480px) {
    padding-top: 0;
  }
`;

export const Sidebar = observer(() => {
  return (
    <SidebarWrapper>
      <SidebarHeader />
      <SidebarContent>
        <SidebarUser />
        <SidebarTagList />
      </SidebarContent>
    </SidebarWrapper>
  );
});
