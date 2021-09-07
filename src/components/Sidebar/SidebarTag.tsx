import { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css, styled } from "goober";
import { Dropdown, Input, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

type TProps = {
  id: number;
};

const SidebarTagContainer = styled("div")`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0 15px 0 10px;
  min-width: 100px;
  min-height: 30px;
  color: #607d8b;
  border: 1px solid #607d8b;

  margin: 0 5px 5px 0;
  text-align: center;
  border-radius: 6px;
`;

const SidebarTagMenu = styled("div")`
  position: absolute;
  top: 0;
  right: 0;
  visibility: hidden;

  ${SidebarTagContainer}:hover > & {
    visibility: visible;
  }
`;

export const SidebarTag = observer(({ id }: TProps) => {
  const { tagsStore, contactStore, sidebarStore } = useStore();
  const tag = tagsStore.getById([id])[0];

  const [menuVisible, setMenuVisible] = useState(false);
  const [edited, setEdited] = useState(false);
  const [tagName, setTagName] = useState(tag?.name ?? "");

  const inputRef = useRef(null);

  const onDelete = async () => {
    await contactStore.activeContact?.deleteTag(id);

    const activeTags = contactStore.activeContact?.tags ?? [];

    // reset contact if last tag delete
    if (activeTags.length === 0 && !activeTags.some((tagId) => tagId === id)) {
      sidebarStore.hide();
      contactStore.setActiveContact(null);
    }
  };

  const onEdit = async () => {
    setEdited(false);
    inputRef.current!.focus({
      cursor: "start",
    });

    const trimmedTagName = tagName.trim();
    if (trimmedTagName !== "") {
      await tagsStore.edit(id, trimmedTagName);
      setTagName(trimmedTagName);
    } else {
      setTagName(tag?.name ?? "");
    }
  };

  return (
    <SidebarTagContainer
      onContextMenu={(ev) => {
        ev.preventDefault();
        setEdited(false);
        setMenuVisible(true);
      }}
    >
      <Input
        type={"text"}
        className={css`
          position: absolute;
          left: 0;
          right: 0;
          padding: 0 10px;

          color: #607d8b;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;

          border: none;
          outline: none;
          background-color: transparent;

          &:focus {
            box-shadow: none;
          }

          &:disabled {
            color: inherit;
            cursor: default;
          }
        `}
        ref={inputRef}
        value={tagName}
        disabled={!edited}
        onChange={(ev) => setTagName(ev.target.value)}
        onPressEnter={() => onEdit()}
      />

      <SidebarTagMenu>
        <Dropdown
          visible={menuVisible}
          onVisibleChange={(visible) => setMenuVisible(visible)}
          overlay={
            <Menu
              className={css`
                border-radius: 10px;
              `}
              onClick={() => setMenuVisible(false)}
            >
              <Menu.Item
                key={"sidebar-tag-edit-item"}
                onClick={() => {
                  setTimeout(() => {
                    inputRef.current!.focus({
                      cursor: "end",
                    });
                  });

                  setEdited(true);
                }}
              >
                Переименовать у всех
              </Menu.Item>
              <Menu.Item key={"sidebar-tag-del-item"} onClick={onDelete}>
                Удалить у диалога
              </Menu.Item>
            </Menu>
          }
          overlayStyle={{
            animationDelay: "0s",
            animationDuration: "0s",
          }}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      </SidebarTagMenu>
    </SidebarTagContainer>
  );
});