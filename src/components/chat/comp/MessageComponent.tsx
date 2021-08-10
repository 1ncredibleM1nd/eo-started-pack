import React from "react";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import { Icon } from "@/ui";
import { Menu, Dropdown } from "antd";
import { TypesMessage } from "@/stores/classes";
import { MoreOutlined } from "@ant-design/icons";
import { Message } from "@/entities";
import { UserAvatar } from "@/components/user_info/UserAvatar";
import { MessageAttachment } from "./MessageAttachment";
import { TMessageAttachment } from "@/types/message";
import dayjs from "@/services/dayjs";
import { download } from "@/ApiResolvers/file";

type IProps = {
  message?: Message;
  replyMsg?: (arg0: Message) => void;
  messageDateDivider: any;
};

const MessageComponent = observer((props: IProps) => {
  const { message, replyMsg, messageDateDivider } = props;

  const [dropdownMenuOpened, setDropdownMenuOpen] = useState(false);

  const renderDataTimeBlock = (time: string) => (
    <div className="date_container">
      <div className="date">{time}</div>
    </div>
  );

  const DropDownMenu = (message: Message) => {
    const canShowDownload =
      message.attachments.length > 0 &&
      message.attachments.every(
        ({ type }) => type === "image" || type === "file"
      );
    return (
      <Menu>
        <Menu.Item key={"message_menu_reply"} onClick={() => replyMsg(message)}>
          {message.entity.type.indexOf("comment") > -1
            ? "Ответить на комментарий"
            : "Ответить"}
        </Menu.Item>
        {canShowDownload && (
          <Menu.Item
            key={"message_menu_download"}
            onClick={async () => {
              await Promise.all(
                message.attachments.map((attachment) =>
                  download(attachment.url, attachment.title)
                )
              );
            }}
          >
            Скачать
          </Menu.Item>
        )}
      </Menu>
    );
  };

  const renderMessagesWrapper = (message: any) => {
    const messageReplyTo = message?.entity?.data?.replyTo;
    const renderReplyAttachments =
      message?.reply?.attachments.map((attachment: TMessageAttachment) => (
        <MessageAttachment
          key={`reply_file_attachment_${attachment.url}`}
          attachment={attachment}
        />
      )) ?? [];

    const renderAttachments =
      message?.attachments.map((attachment: TMessageAttachment) => (
        <MessageAttachment
          key={`file_attachment_${attachment.url}`}
          attachment={attachment}
        />
      )) ?? [];

    return (
      <div className="message-wrapper">
        <div className="avatar avatar-sm">{renderUserAvatar(message.user)}</div>
        <div className={`message-container`}>
          <Dropdown
            overlay={DropDownMenu(message)}
            overlayStyle={{ animationDelay: "0s", animationDuration: "0s" }}
            onVisibleChange={(visible) => {
              if (visible) {
                setDropdownMenuOpen(false);
              }
            }}
            placement="bottomLeft"
            trigger={["contextMenu"]}
          >
            <div
              className={`message-content ${
                message.combineWithPrevious ? "not-main" : ""
              } `}
            >
              {message.reply ? (
                <div className="reply">
                  <div className="msg_text_container">
                    {renderReplyAttachments.length > 0 && (
                      <div className="msg_file_container">
                        {renderReplyAttachments}
                      </div>
                    )}
                    <ReactMarkdown
                      className="message-markdown-container"
                      children={message.reply.content}
                      allowedElements={["a"]}
                      unwrapDisallowed={true}
                      linkTarget="_blank"
                    />
                  </div>
                  <div className="msg_type">
                    <a
                      href={
                        messageReplyTo?.entity?.data?.url ??
                        message.entity.data.url
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {TypesMessage.getTypeDescription(
                        messageReplyTo?.entity?.type ?? message.entity.type
                      )}
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="msg_text_container">
                {renderAttachments.length > 0 && (
                  <div className="msg_file_container">{renderAttachments}</div>
                )}
                <ReactMarkdown
                  className="message-markdown-container"
                  children={message.content}
                  allowedElements={["a", "p"]}
                  unwrapDisallowed={true}
                  linkTarget="_blank"
                />
              </div>
              {renderMessagesOptions(message)}
            </div>
          </Dropdown>
          <div className="msg_menu-container">
            <div className="msg_menu">
              <Dropdown
                visible={dropdownMenuOpened}
                onVisibleChange={(visible) => setDropdownMenuOpen(visible)}
                overlay={DropDownMenu(message)}
                overlayStyle={{ animationDelay: "0s", animationDuration: "0s" }}
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
            <a href={message.entity.data.url} target="_blank" rel="noreferrer">
              {TypesMessage.getTypeDescription(message.entity.type)}
            </a>
          </div>
          <div className="msg_time">
            {dayjs(message.timestamp * 1000).format("HH:mm")}
          </div>
        </span>
      </div>
    );

  return (
    <>
      {messageDateDivider && renderDataTimeBlock(messageDateDivider)}
      <div
        className={`message message-${message.id} ${
          message.income ? "" : "self"
        } ${message.combineWithPrevious ? "not-main" : ""}`}
      >
        {renderMessagesWrapper(message)}
      </div>
    </>
  );
});

export default MessageComponent;
