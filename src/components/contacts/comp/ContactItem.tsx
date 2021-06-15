import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { Badge } from "antd";
import { Icon } from "@ui";
import { UserAvatar } from "@components/user_info/UserAvatar";
import { Message } from "@entities";

type IProps = {
  index: number;
  lastMessage: any;
  contact: any;
  online: any;
  active: any;
  selectContact: any;
  isIAm: boolean;
};

const ContactItem = observer((props: IProps) => {
  const { index, lastMessage, contact, online, active, selectContact, isIAm } =
    props;

  let social_media: string = "";
  let status: string = "read";

  if (lastMessage) {
    if (lastMessage.income && !lastMessage.readed) {
      status = "unread";
    }
    social_media = lastMessage.social_media;
  }

  const contactTime = (message: Message) => {
    let now = moment(new Date());
    let contactDate = moment(message.date, "DD.MM.YY");
    let diff = now.diff(contactDate, "days");

    if (diff === 0) {
      return <span>{message.time}</span>;
    } else if (diff <= 7) {
      return <span>{contactDate.format("dd")}</span>;
    } else {
      return <span>{message.date}</span>;
    }
  };

  return (
    <li
      onClick={() => selectContact(contact.id)}
      className={`contacts-item friends contact-item-${index} ${
        active && "active"
      }`}
    >
      <div className="avatar">
        <div className={`social_media_icon white ${social_media}`}>
          <Icon className="icon_s" name={`social_media_${social_media}`} />
        </div>
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
          <h4 className="chat-name user_name_to">{contact.user.username}</h4>
          <div className="chat-time">
            {lastMessage && <>{contactTime(lastMessage)}</>}
          </div>
        </div>
        <div className="contacts-texts">
          {lastMessage ? (
            <div className={`last_msg ${status}`}>
              {isIAm ? <div className="from">Ты:</div> : ""}
              {lastMessage.content}
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
