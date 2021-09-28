import { observer } from "mobx-react-lite";
import { Button, Popover } from "antd";
import { tags as tagsApi } from "@/api";
import { css } from "goober";
import { useStore } from "@/stores";
import { SidebarTagAddInput } from "@/components/Sidebar/SidebarTagAddInput";
import { useState } from "react";
import { Icon } from "@/ui/Icon/Icon";

const SidebarTagAddPopupListItem = observer(
  ({ id, onRemove }: { id: number; onRemove: any }) => {
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
        <Icon
          name={"icon_delete"}
          fill={"#607d8b"}
          onClick={() => onRemove(id)}
          className={css`
            cursor: pointer;
          `}
        />
      </div>
    );
  }
);

const SidebarTagConfirmRemove = observer(
  ({ onRemove, onCancel }: { onRemove: any; onCancel: any }) => {
    return (
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <h2
          className={css`
            font-weight: bold;
            font-size: 14px;
            text-align: center;
          `}
        >
          Тег будет удален из всех диалогов. Вы уверены ?
        </h2>
        <Button
          type={"text"}
          className={css`
            color: #ef8079;
          `}
          onClick={onRemove}
        >
          Удалить
        </Button>
        <Button type={"text"} onClick={onCancel}>
          Отмена
        </Button>
      </div>
    );
  }
);

const SidebarTagAddContainer = observer(() => {
  const { contactStore, tagsStore } = useStore();
  const activeContact = contactStore.activeContact;
  const tags = tagsStore.getBySchools([Number(activeContact?.schoolId)]) ?? [];
  const [removeTagId, setRemoveTagId] = useState(-1);

  const removeTag = async () => {
    if (removeTagId > -1) {
      if (await tagsApi.remove(removeTagId)) {
        activeContact?.removeTag(removeTagId);
      }

      setRemoveTagId(-1);
    }
  };

  return (
    <div
      className={css`
        padding: 10px;
        max-width: 200px;
      `}
    >
      {removeTagId !== -1 ? (
        <SidebarTagConfirmRemove
          onRemove={() => removeTag()}
          onCancel={() => setRemoveTagId(-1)}
        />
      ) : (
        <>
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
                onRemove={() => setRemoveTagId(tag.id)}
              />
            ))}
          </div>
          <SidebarTagAddInput />
        </>
      )}
    </div>
  );
});

export const SidebarTagAddPopup = observer(() => {
  return (
    <Popover
      trigger={"click"}
      content={<SidebarTagAddContainer />}
      placement={"bottom"}
      destroyTooltipOnHide
    >
      <Icon
        name={"icon_settings"}
        className={css`
          margin-left: 5px;
          cursor: pointer;
        `}
        fill={"#607d8b"}
      />
    </Popover>
  );
});
