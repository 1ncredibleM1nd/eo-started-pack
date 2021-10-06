import { observer } from "mobx-react-lite";
import { SidebarUser } from "@/components/Sidebar/SidebarUser";
import { SidebarTagList } from "@/components/Sidebar/SidebarTagList";
import { css } from "goober";

export const Sidebar = observer(() => {
  return (
    <div
      className={css`
        overflow-y: scroll;
        height: 100vh;
        background-color: #f4f5f6;
      `}
    >
      <div
        className={css`
          padding: 15px 10px;
          padding-bottom: 13px;
          border-left: 1px solid #e6ebeb;
        `}
      >
        <SidebarUser />
        <SidebarTagList />
      </div>
    </div>
  );
});
