import { observer } from "mobx-react-lite";
import { Input, Popover } from "antd";
import { IconDelete, IconSettings } from "@/images/icons";
import { css } from "goober";
import { useState } from "react";
import { useStore } from "@/stores";

type TProps = {};

const SidebarAddTagListItem = observer(
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

            max-width: 100px;
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
  const [tagName, setTagName] = useState(""); // for tests

  const addTag = async () => {
    const trimmedTagName = tagName.trim();
    if (trimmedTagName !== "") {
      await tagsStore.add(activeContact?.schoolId, trimmedTagName);
    }

    setTagName("");
  };

  const deleteTag = async (id: number) => {
    if (window.confirm("Тег будет удалён из всех диалогов. Вы уверены ?")) {
      if (await tagsStore.delete(id)) {
        activeContact?.deleteTag(id);
      }
    }
  };

  return (
    <div
      className={css`
        padding: 10px;
        min-width: 200px;
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
          <SidebarAddTagListItem
            key={tag.id}
            id={tag.id}
            onDelete={deleteTag}
          />
        ))}
      </div>
      <Input
        className={css`
          padding: 0 0 5px 0;
          border: none;
          outline: none;
          box-shadow: none !important;
          border-bottom: 1px solid #607d8b !important;
        `}
        onChange={(e) => setTagName(e.target.value)}
        onPressEnter={() => addTag()}
        value={tagName}
        placeholder={"Введите новый тег"}
      />
    </div>
  );
});

export const SidebarAddTagPopup = observer(({}: TProps) => {
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
