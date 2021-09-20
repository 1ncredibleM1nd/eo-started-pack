import { observer } from "mobx-react-lite";
import { Popover } from "antd";
import { IconDelete, IconSettings } from "@/images/icons";
import { tags as tagsApi } from "@/ApiResolvers";
import { css } from "goober";
import { useStore } from "@/stores";
import { SidebarTagAddInput } from "@/components/Sidebar/SidebarTagAddInput";

const SidebarTagAddPopupListItem = observer(
  ({ id, onDelete }: { id: number; onDelete: any }) => {
    const { tagsStore } = useStore();
    const tag = tagsStore.getById([id])[0];

    return (
      <div
        className={css`
          display: inline-flex;
          margin: 8px 0;
          justify-content: space-between;
        `}
      >
        <h4
          className={css`
            font-weight: 400;
            font-size: 14px;
            margin: 0;

            max-width: calc(100% - 20px);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          `}
        >
          {tag?.name ?? "Untitled"}
        </h4>
        <IconDelete fill={"#607d8b"} onClick={() => onDelete(id)} />
      </div>
    );
  }
);

const SidebarAddTagContainer = observer(() => {
  const { contactStore, tagsStore } = useStore();
  const activeContact = contactStore.activeContact;
  const tags = tagsStore.getBySchools([Number(activeContact?.schoolId)]) ?? [];

  const deleteTag = async (id: number) => {
    if (window.confirm("Тег будет удалён из всех диалогов. Вы уверены ?")) {
      if (await tagsApi.delete(id)) {
        activeContact?.deleteTag(id);
      }
    }
  };

  return (
    <div
      className={css`
        padding: 10px;
        max-width: 200px;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: column;
          overflow-y: scroll;
          max-height: 200px;
          padding: 0 10px 0 0;
        `}
      >
        {tags.map((tag) => (
          <SidebarTagAddPopupListItem
            key={tag.id}
            id={tag.id}
            onDelete={deleteTag}
          />
        ))}
      </div>
      <SidebarTagAddInput />
    </div>
  );
});

export const SidebarTagAddPopup = observer(() => {
  return (
    <Popover
      trigger={"click"}
      content={<SidebarAddTagContainer />}
      placement={"bottom"}
      destroyTooltipOnHide
    >
      <IconSettings
        className={css`
          margin-left: 5px;
          cursor: pointer;
        `}
        fill={"#607d8b"}
      />
    </Popover>
  );
});
