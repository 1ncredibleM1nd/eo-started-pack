import React from "react";
import { observer } from "mobx-react-lite";
import dayjs, { toCalendar } from "@/services/dayjs";
import { Badge } from "antd";
import { Icon } from "@/ui";
import { UserAvatar } from "@/components/user_info/UserAvatar";
import { Message } from "@/entities";
import ReactMarkdown from "react-markdown";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

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

const ContactItem = observer((props: IProps) => {
  const {
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
  } = props;

  let social_media: string = "";
  let status: string = "read";

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
        onClick={() => selectContact(contact.id)}
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
            <div className={"contacts-info-icon"}>
              <img
                src={school.logo}
                className="school-logo"
                title={school.name}
                alt={school.name}
              />
            </div>

            <div className={"contacts-info-icon"}>
              <div className={`social_media_icon ${social_media}`}>
                <Icon
                  className="icon_s"
                  name={`social_media_${social_media}`}
                />
              </div>
            </div>

            <h4 className="chat-name user_name_to">{contact.user.username}</h4>
            <div className="chat-time">
              {lastMessage && <>{contactTime(lastMessage)}</>}
            </div>
          </div>
          <div className="contacts-texts">
            {lastMessage ? (
              <div className={`last_msg ${status}`}>
                {lastMessage?.entity?.type.includes("comment") && (
                  <Icon className="icon_s icon_comment" name={"icon_comment"} />
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
                {status === "unread" && <div className="unreaded_count"></div>}
              </div>
            ) : (
              <div className={`last_msg ${status}`}>*Добавлен в контакты*</div>
            )}
          </div>
        </div>
      </li>
    </Dropdown>
  );
});

export default ContactItem;
