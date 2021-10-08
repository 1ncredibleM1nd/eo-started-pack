import { observer } from "mobx-react-lite";
import dayjs, { toCalendar } from "@/services/dayjs";
import { Badge } from "antd";
import { UserAvatar } from "@/components/user_info/UserAvatar";
import { Message } from "@/entities";
import ReactMarkdown from "react-markdown";
import { Menu, Dropdown } from "antd";
import { Icon } from "@/ui/Icon/Icon";
import { useStore } from "@/stores";

type IProps = {
  index: number;
  lastMessage: Message;
  contact: any;
  online: any;
  active: any;
  selectContact: any;
  isIAm: boolean;
  isManager: boolean;
  school: any;
  setUnreadChat: any;
};

export const ConversationItem = observer(
  ({
    index,
    lastMessage,
    contact,
    online,
    active,
    selectContact,
    isIAm,
    isManager,
    school,
    setUnreadChat,
  }: IProps) => {
    let social_media: string = "";
    let status: string = "read";
    const { authStore } = useStore();

    if (lastMessage) {
      if (!contact.readed) {
        status = "unread";
      }
      social_media = lastMessage.social_media;
    }

    const DropDownMenu = (contactId: string) => {
      return (
        <Menu onClick={({ domEvent }) => domEvent.stopPropagation()}>
          <Menu.Item
            key={"chat_unread_menu"}
            onClick={() => setUnreadChat(contactId)}
          >
            Пометить как непрочитанное
          </Menu.Item>
          {!authStore.isFrame ? (
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
                  window.open(
                    `/chat?im=${contactId}`,
                    "_blank",
                    "location=yes"
                  );
                }}
              >
                Открыть в новом окне
              </Menu.Item>
            </>
          ) : null}
        </Menu>
      );
    };

    const contactTime = (message: Message) => {
      let contactDate = dayjs(message.timestamp * 1000);

      return (
        <span>
          {toCalendar(contactDate, {
            sameDay: "HH:mm",
            lastDay: "dd",
            lastWeek: "dd",
          })}
        </span>
      );
    };

    return (
      <Dropdown
        overlay={DropDownMenu(contact.id)}
        overlayStyle={{ animationDelay: "0s", animationDuration: "0s" }}
        placement="bottomLeft"
        trigger={["contextMenu"]}
      >
        <li
          onClick={() => selectContact(contact)}
          className={`contacts-item contacts-item-${index} friends ${
            active && "active"
          }`}
        >
          <div className="avatar">
            <Badge className={`online_dot ${active && "active"}`} dot={online}>
              <UserAvatar
                size="48"
                user={contact.user}
                round={true}
                textSizeRatio={1.75}
              />
            </Badge>
          </div>

          <div className="contacts-content">
            <div className="contacts-info">
              <div className={"contacts-school-icon"}>
                <img
                  src={school.logo}
                  className="school-logo"
                  title={school.name}
                  alt={school.name}
                />
              </div>

              <div className={"contacts-school-icon"}>
                <div className={`social_media_icon ${social_media}`}>
                  <Icon name={`social_media_${social_media}`} />
                </div>
              </div>

              <h4 className="chat-name user_name_to">
                {contact.user.username}
              </h4>
              <div className="chat-time">
                {lastMessage && <>{contactTime(lastMessage)}</>}
              </div>
            </div>
            <div className="contacts-texts">
              {lastMessage ? (
                <div className={`last_msg ${status}`}>
                  {lastMessage?.entity?.type.includes("comment") && (
                    <Icon name={"icon_comment"} className="icon_comment" />
                  )}
                  {isManager ? (
                    <div className="from">
                      {`${
                        isIAm
                          ? "Вы"
                          : lastMessage.user?.username.trim() ?? "Группа"
                      }:`}
                    </div>
                  ) : (
                    ""
                  )}
                  <ReactMarkdown
                    className="last-message-content"
                    children={lastMessage.content}
                    allowedElements={[]}
                    unwrapDisallowed={true}
                    linkTarget="_blank"
                  />
                  {status === "unread" && (
                    <div className="unreaded_count"></div>
                  )}
                </div>
              ) : (
                <div className={`last_msg ${status}`}>
                  *Добавлен в контакты*
                </div>
              )}
            </div>
          </div>
        </li>
      </Dropdown>
    );
  }
);
