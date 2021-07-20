import React from "react";
import { observer } from "mobx-react";
import dayjs from "@/services/dayjs";
import { Badge } from "antd";
import { Icon } from "@/ui";
import { UserAvatar } from "@/components/user_info/UserAvatar";
import { Message } from "@/entities";
import ReactMarkdown from "react-markdown";

type IProps = {
  index: number;
  lastMessage: any;
  contact: any;
  online: any;
  active: any;
  selectContact: any;
  isIAm: boolean;
  isManager: boolean;
  school: any;
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
  } = props;

  let social_media: string = "";
  let status: string = "read";

  if (lastMessage) {
    if (lastMessage.income && !lastMessage.readed) {
      status = "unread";
    }
    social_media = lastMessage.social_media;
  }

  const contactTime = (message: Message) => {
    let now = dayjs(new Date());
    let contactDate = dayjs(message.timestamp * 1000);
    let diff = now.diff(contactDate, "days");

    if (diff === 0) {
      return <span>{contactDate.format("HH:mm")}</span>;
    } else if (diff <= 7) {
      return <span>{contactDate.format("dd")}</span>;
    } else {
      return <span>{contactDate.format("DD.MM")}</span>;
    }
  };

  return (
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
            />
          </div>

          <div className={"contacts-info-icon"}>
            <div className={`social_media_icon ${social_media}`}>
              <Icon className="icon_s" name={`social_media_${social_media}`} />
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
              {isManager ? (
                <div className="from">{isIAm ? "Вы" : lastMessage.user.username.trim()}</div> <>:</>
              ) : ""}
              <ReactMarkdown
                children={lastMessage.content}
                components={{ p: ({ children }) => children }}
                linkTarget="_blank"
              />
              {status === "unread" && (
                <>
                  <>&nbsp;</>
                  <div className="unreaded_count"></div>
                </>
              )}
            </div>
          ) : (
            <div className={`last_msg ${status}`}>*Добавлен в контакты*</div>
          )}
        </div>
      </div>
    </li>
  );
});

export default ContactItem;
