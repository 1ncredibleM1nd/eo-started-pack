import React from "react";
import { observer } from "mobx-react";
import { Icon } from "@/ui";
import { Menu, Dropdown } from "antd";
import { TypesMessage } from "@/stores/classes";
import { MoreOutlined } from "@ant-design/icons";
import { Message } from "@/entities";
import { UserAvatar } from "@/components/user_info/UserAvatar";
import { MessageAttachment } from "./MessageAttachment";
import { TMessageAttachment } from "@/types/message";
import dayjs from "@/services/dayjs";

type IProps = {
  message?: Message;
  replyMsg?: (arg0: Message) => void;
  messageDateDivider: any;
};

const MessageComponent = observer((props: IProps) => {
  const { message, replyMsg, messageDateDivider } = props;

  const renderDataTimeBlock = (time: string) => (
    <div className="date_container">
      <div className="date">{time}</div>
    </div>
  );

  const DropDownMenu = (message: any) => (
    <Menu>
      <Menu.Item onClick={() => replyMsg(message)}>Ответить</Menu.Item>
    </Menu>
  );

  const renderMessagesWrapper = (message: any) => {
    const renderAttachments =
      message?.reply?.attachments.map((attachment: TMessageAttachment) => (
        <MessageAttachment
          key={`reply_file__attachment_${attachment.url}`}
          attachment={attachment}
        />
      )) ?? [];

    return (
      <div className="message-wrapper">
        <div className="avatar avatar-sm">{renderUserAvatar(message.user)}</div>
        <div
          className={`message-content ${
            message.combineWithPrevious ? "not-main" : ""
          } `}
        >
          <Dropdown
            overlay={DropDownMenu(message)}
            overlayStyle={{ animationDuration: "0.075s" }}
            placement="bottomLeft"
            trigger={["contextMenu"]}
          >
            <div>
              {message.reply ? (
                <div className="reply">
                  <div className="msg_text_container">
                    <div className="msg_file_container">
                      {renderAttachments}
                    </div>
                    <div style={{ whiteSpace: "pre-line" }}>
                      {message.reply.content}
                    </div>
                  </div>
                  <div className="msg_type">
                    {TypesMessage.getTypeDescription(message.entity.type)}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="msg_text_container">
                {message.attachments.length > 0 && (
                  <div className="msg_file_container">
                    {message.attachments.map((attachment: any) => (
                      <MessageAttachment
                        key={`file_attachment_${attachment.url}`}
                        attachment={attachment}
                      />
                    ))}
                  </div>
                )}
                <div style={{ whiteSpace: "pre-line" }}>{message.content}</div>
              </div>
              {renderMessagesOptions(message)}
            </div>
          </Dropdown>

          <div className="msg_menu-container">
            <div className="msg_menu">
              <Dropdown
                overlay={DropDownMenu(message)}
                overlayStyle={{ animationDuration: "0.075" }}
                placement="bottomLeft"
                trigger={["click"]}
              >
                <MoreOutlined className="dropdown-trigger" />
              </Dropdown>
            </div>
            {message.editted && (
              <div className="editted_icon">
                <Icon className="active-grey" name={`solid_pencil-alt`} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderUserAvatar = (user: any) =>
    user ? (
      <UserAvatar size="36" user={user} round={true} textSizeRatio={1.75} />
    ) : (
      <img
        src="https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png"
        alt=""
      />
    );

  const renderMessagesOptions = (message: any) =>
    !message.combineWithPrevious && (
      <div className="message-options">
        <div className={`social_media_icon ${message.social_media}`}>
          <Icon
            className="icon_s"
            name={`social_media_${message.social_media}`}
          />
        </div>
        <span className="message-status">
          <div className="msg_type">
            {TypesMessage.getTypeDescription(message.entity.type)}
          </div>
          <div className="msg_time">
            {dayjs(message.timestamp * 1000).format("HH:mm")}
          </div>
        </span>
      </div>
    );

  return (
    <>
      {message.income ? (
        <>
          {messageDateDivider && renderDataTimeBlock(messageDateDivider)}
          <div
            className={`message ${
              message.combineWithPrevious ? "not-main" : ""
            } `}
          >
            {renderMessagesWrapper(message)}
          </div>
        </>
      ) : (
        <>
          {messageDateDivider && renderDataTimeBlock(messageDateDivider)}
          <div
            className={`message self ${
              message.combineWithPrevious ? "not-main" : ""
            } `}
          >
            {renderMessagesWrapper(message)}
          </div>
        </>
      )}
    </>
  );
});

export default MessageComponent;
