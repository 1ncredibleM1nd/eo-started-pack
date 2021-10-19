import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css, styled } from "goober";
import { Dropdown, Input, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

type TProps = {
  id: number;
  color: string;
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
  top: 6px;
  right: 0;
  display: flex;
  visibility: hidden;

  ${SidebarTagContainer}:hover > & {
    visibility: visible;
  }
`;

export const SidebarTag = observer(({ id, color }: TProps) => {
  const { tagsStore, contactStore, sidebarStore } = useStore();
  const tag = tagsStore.getById([id])[0];

  const [menuVisible, setMenuVisible] = useState(false);
  const [edited, setEdited] = useState(false);
  const [tagName, setTagName] = useState(tag?.name ?? "");

  const inputRef = useRef(null);

  useEffect(() => {
    setTagName(tag?.name ?? "");
  }, [tag?.name]);

  const onDelete = async () => {
    await contactStore.activeContact?.removeTag(id);
    const activeTags = tagsStore.activeTags ?? [];
    const contactTags = contactStore.activeContact?.tags ?? [];

    // reset contact if last tag delete
    if (!activeTags.every((tag) => contactTags.includes(tag.id))) {
      sidebarStore.setOpened(false);
      contactStore.removeContact(contactStore.activeContactId);
    }
  };

  const onEdit = async () => {
    setEdited(false);
    inputRef.current!.focus({
      cursor: "start",
    });

    const trimmedTagName = tagName.trim();
    if (trimmedTagName !== "") {
      await tagsStore.editRemote(id, trimmedTagName);
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
      className={css`
        background-color: ${tag?.color ? tag?.color : "#D9D9D9"};
        border: none;
      `}
    >
      <Input
        type={"text"}
        className={css`
          position: absolute;
          left: 0;
          right: 0;
          padding: 0 10px;
          color: #050505 !important;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          outline: none;
          border: none !important;
          background-color: ${tag?.color ? tag?.color : "#D9D9D9"} !important;

          &:focus {
            box-shadow: none;
          }

          &:disabled {
            cursor: default;
          }
        `}
        ref={inputRef}
        value={tagName}
        disabled={!edited}
        onChange={(ev) => setTagName(ev.target.value)}
        onPressEnter={() => onEdit()}
        onBlur={() => onEdit()}
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
              onClick={(ev) => {
                if (ev.key === "sidebar-tag-edit-item") {
                  setTimeout(() => {
                    inputRef.current!.focus({
                      cursor: "end",
                    });
                  });

                  setEdited(true);
                } else if (ev.key === "sidebar-tag-del-item") {
                  onDelete();
                }

                setMenuVisible(false);
              }}
            >
              <Menu.Item key={"sidebar-tag-edit-item"}>
                Переименовать у всех
              </Menu.Item>
              <Menu.Item key={"sidebar-tag-del-item"}>
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
          <MoreOutlined
            className={css`
              color: #050505;
              font-size: 17px;
            `}
          />
        </Dropdown>
      </SidebarTagMenu>
    </SidebarTagContainer>
  );
});
