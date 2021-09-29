import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { SidebarTag } from "./SidebarTag";
import { css } from "goober";
import { SidebarTagAddPopup } from "@/components/Sidebar/SidebarTagAddPopup";
import { SidebarTagSelectPopup } from "@/components/Sidebar/SidebarTagSelectPopup";

export const SidebarTagList = observer(() => {
  const { contactStore } = useStore();
  const tags = contactStore?.activeContact?.tags ?? [];

  return (
    <div>
      <div
        className={css`
          display: inline-flex;
          align-items: center;
          margin-bottom: 12px;
        `}
      >
        <h2
          className={css`
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 0;
          `}
        >
          Теги
        </h2>
        <SidebarTagAddPopup />
      </div>

      <div
        className={css`
          display: flex;
          flex-flow: wrap;
        `}
      >
        {tags.map((tagId) => (
          <SidebarTag key={tagId} id={tagId} />
        ))}
        <SidebarTagSelectPopup />
      </div>
    </div>
  );
});
