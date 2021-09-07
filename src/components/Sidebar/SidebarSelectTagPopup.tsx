import { observer } from "mobx-react-lite";
import { Button, Checkbox, Popover } from "antd";
import { IconAdd } from "@/images/icons";
import { css } from "goober";
import { useStore } from "@/stores";
import { Tag } from "@/stores/model/Tag";
import { useEffect, useState } from "react";
import { SidebarSelectTags } from "@/stores/SidebarSelectTags";

const SidebarSelectTagListItem = observer(
  ({
    tag,
    checked,
    onSelect,
  }: {
    tag: Tag;
    checked: boolean;
    onSelect: any;
  }) => {
    return (
      <div
        className={css`
          display: inline-flex;
          margin: 8px 0;
          justify-content: space-between;
        `}
      >
        <Checkbox
          checked={checked}
          onChange={(ev) => {
            onSelect(tag.id, ev.target.checked);
          }}
        >
          <div
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
          </div>
        </Checkbox>
      </div>
    );
  }
);

const SidebarSelectTagContainer = observer(
  ({ onComplete }: { onComplete: any }) => {
    const { tagsStore, contactStore } = useStore();
    const activeContact = contactStore?.activeContact;
    const allTags =
      tagsStore.getBySchools([Number(activeContact?.schoolId)]) ?? [];
    const contactTags = activeContact?.tags ?? [];
    const [selectTags] = useState(() => new SidebarSelectTags(allTags));

    useEffect(() => {
      allTags.forEach((tag) =>
        selectTags.select(tag.id, contactTags.includes(tag.id))
      );
    }, [contactTags]);

    const selectTag = async (id: number, checked: boolean) => {
      selectTags.select(id, checked);
    };

    const addTags = async () => {
      await activeContact?.addTag(selectTags.selected, true);
    };

    return (
      <div
        className={css`
          padding: 10px;
          min-width: 200px;
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

        <div
          className={css`
            display: flex;
            flex-flow: column;
            overflow-y: scroll;
            max-height: 200px;
            padding: 0 10px 0 0;
          `}
        >
          {allTags.map((tag) => (
            <SidebarSelectTagListItem
              key={tag.id}
              tag={tag}
              checked={selectTags.getChecked(tag.id)}
              onSelect={selectTag}
            />
          ))}
        </div>

        <Button
          type={"link"}
          className={css`
            padding: 0;
            height: auto;
          `}
          onClick={() => {
            addTags();
            onComplete();
          }}
        >
          Добавить к диалогу
        </Button>
      </div>
    );
  }
);

export const SidebarSelectTagPopup = observer(() => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      visible={visible}
      onVisibleChange={(value) => setVisible(value)}
      content={
        <SidebarSelectTagContainer onComplete={() => setVisible(false)} />
      }
      trigger={"click"}
      destroyTooltipOnHide
    >
      <div
        className={css`
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          color: #1890ff;
          padding: 0;
          margin: 0 5px 5px 0;
        `}
      >
        <IconAdd
          className={css`
            margin-right: 5px;
          `}
          fill={"#1890ff"}
        />
        Добавить
      </div>
    </Popover>
  );
});