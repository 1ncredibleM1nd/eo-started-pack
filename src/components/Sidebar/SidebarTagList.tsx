import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { SidebarTag } from "./SidebarTag";
import { css } from "goober";
import { SidebarAddTagPopup } from "@/components/Sidebar/SidebarAddTagPopup";
import { SidebarSelectTagPopup } from "@/components/Sidebar/SidebarSelectTagPopup";

export const SidebarTagList = observer(() => {
  const { contactStore } = useStore();
  const tags = contactStore?.activeContact?.tags ?? [];

  return (
    <div>
      <div
        className={css`
          display: inline-flex;
        `}
      >
        <h2
          className={css`
            font-size: 14px;
            font-weight: 500;
          `}
        >
          Теги
        </h2>
        <SidebarAddTagPopup />
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
        <SidebarSelectTagPopup />
      </div>
    </div>
  );
});
