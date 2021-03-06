import { observer } from "mobx-react-lite";
import { Checkbox, Popover } from "antd";
import { css } from "goober";
import { useStore } from "@/stores";
import { Tag } from "@/stores/model";
import { useEffect, useState } from "react";
import { SidebarSelectTags } from "@/stores/SidebarSelectTags";
import { SidebarTagAddInput } from "@/components/Sidebar/SidebarTagAddInput";
import { Icon } from "@/ui/Icon/Icon";

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

          .ant-checkbox-wrapper {
            min-width: 0;

            span:last-child {
              min-width: calc(100% - 20px);
            }
          }
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

const SidebarSelectTagContainer = observer(() => {
  const { tagsStore, contactStore, sidebarStore } = useStore();
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
    await activeContact?.addTag(selectTags.selected);

    if (
      (tagsStore.activeTags.length > 0 || tagsStore.noTags) &&
      !tagsStore.activeTags.some(({ id }) => selectTags.selected.includes(id))
    ) {
      sidebarStore.setOpened(false);
      contactStore.removeContact(contactStore.activeContactId);
    }
  };

  const onAddedTag = async (tag: Tag) => {
    await selectTag(tag.id, true);
  };

  return (
    <div
      className={css`
        padding: 10px;
        max-width: 200px;
      `}
    >
      <h2
        className={css`
          font-size: 14px;
          font-weight: 500;
        `}
      >
        ????????
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

      <SidebarTagAddInput onAdded={onAddedTag} />
    </div>
  );
});

export const SidebarTagSelectPopup = observer(() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Popover
        // arrowContent={false}
        visible={visible}
        onVisibleChange={(value) => setVisible(value)}
        content={
          <SidebarSelectTagContainer onComplete={() => setVisible(false)} />
        }
        trigger={"click"}
        destroyTooltipOnHide
        className={css`
          position: absolute;
          display: flex;
          width: 100%;
          align-items: center;
        `}
        overlayClassName={css`
          .ant-popover-arrow {
            display: none;
          }
        `}
      />
      <div
        className={css`
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          color: #1890ff;
          padding: 0;
          margin: 0 5px 5px 0;
        `}
        onClick={() => setVisible(!visible)}
      >
        <Icon
          name={"icon_add"}
          className={css`
            margin-right: 5px;
          `}
          fill={"#1890ff"}
        />
        ????????????????
      </div>
    </>
  );
});
