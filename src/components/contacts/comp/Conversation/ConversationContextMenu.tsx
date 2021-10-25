import { Menu } from "antd";
import { TConversationDialogStatus } from "@/stores/model";

type IProps = {
  status: string;
  contactId: number;
  onChangeStatus?: (id: number, status: TConversationDialogStatus) => void;
  isFrame: boolean;
};

const ConversationContextMenu = ({
  status,
  contactId,
  onChangeStatus,
  isFrame,
}: IProps) => {
  return (
    <Menu onClick={({ domEvent }) => domEvent.stopPropagation()}>
      {status === "unread" ? (
        <Menu.Item
          key={"chat_read_menu_item"}
          onClick={() => onChangeStatus?.(contactId, "unanswer")}
        >
          Пометить как прочитанное
        </Menu.Item>
      ) : null}
      {status === "unanswer" || status === "answer" ? (
        <Menu.Item
          key={"chat_unread_menu_item"}
          onClick={() => onChangeStatus?.(contactId, "unread")}
        >
          Пометить как непрочитанное
        </Menu.Item>
      ) : null}
      {status === "unanswer" ? (
        <Menu.Item
          key={"chat_unswer_menu_item"}
          onClick={() => onChangeStatus?.(contactId, "answer")}
        >
          Пометить как отвеченное
        </Menu.Item>
      ) : null}
      {status === "answer" ? (
        <Menu.Item
          key={"chat_ununswer_menu_item"}
          onClick={() => onChangeStatus?.(contactId, "unanswer")}
        >
          Пометить как неотвеченное
        </Menu.Item>
      ) : null}
      {!isFrame ? (
        <>
          <Menu.Item
            key={"chat_open_new_tab"}
            onClick={() => {
              window.open(`/chat?im=${contactId}`, "_blank");
            }}
          >
            Открыть в новой вкладке
          </Menu.Item>
          <Menu.Item
            key={"chat_open_new_window"}
            onClick={() => {
              window.open(`/chat?im=${contactId}`, "_blank", "location=yes");
            }}
          >
            Открыть в новом окне
          </Menu.Item>
        </>
      ) : null}
    </Menu>
  );
};
export default ConversationContextMenu;
