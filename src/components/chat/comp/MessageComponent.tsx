import { useState } from "react";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import { Menu, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Message } from "@/stores/model";
import { MessageAttachment } from "./MessageAttachment";
import dayjs from "@/services/dayjs";
import { download } from "@/api/file";
import { MessageCommentLink } from "./MessageCommentLink";
import { MessageUser } from "@/components/chat/comp/MessageUser";
import { Icon } from "@/ui/Icon/Icon";
import AvatarThumb from "@/components/AvatarThumb";

type TProps = {
  active: boolean;
  message: Message;
  messageDateDivider: string;
  onReplyMessage?: (arg0: Message) => void;
  onDropdownOpen: (state: boolean) => void;
};

const MessageOptions = observer(({ message }: { message: Message }) => {
  if (message.combineWithPrevious) {
    return null;
  }

  return (
    <div className="message-options">
      <div className={`social_media_icon ${message.social_media}`}>
        <Icon name={`social_media_${message.social_media}`} />
      </div>
      <span className="message-status">
        <div className="msg_type">
          <MessageCommentLink
            link={message.entity.data.url}
            type={message.entity.type}
          />
        </div>
        {!message.income && <MessageUser user={message.user} />}
        <div className="msg_time">
          {dayjs(message.timestamp * 1000).format("HH:mm")}
        </div>
      </span>
    </div>
  );
});

const MessageComponent = observer((props: TProps) => {
  const { message, messageDateDivider, onReplyMessage, onDropdownOpen } = props;
  const [dropdownMenuOpened, setDropdownMenuOpen] = useState(false);
  const [dropdownMenuDisabled, setDropdownMenuDisabled] = useState(false);
  const onImagePreview = (state: boolean) => setDropdownMenuDisabled(state);

  const DropDownMenu = (message: Message) => {
    const canShowDownload =
      message.attachments.length > 0 &&
      message.attachments.every(
        ({ type, isIframe }) =>
          type === "image" ||
          type === "file" ||
          type === "audio" ||
          type === "voice" ||
          (type === "video" && !isIframe)
      );
    return (
      <Menu>
        <Menu.Item
          key={"message_menu_reply"}
          onClick={() => {
            onReplyMessage(message);
            setDropdownMenuOpen(false);
          }}
        >
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

  const messageReplyTo = message?.entity?.data?.replyTo;
  const renderReplyAttachments =
    message?.reply?.attachments.map((attachment) => (
      <MessageAttachment
        key={`reply_file_attachment_${attachment.url}`}
        attachment={attachment}
        reply={true}
        onImagePreview={onImagePreview}
      />
    )) ?? [];

  const renderAttachments =
    message?.attachments.map((attachment) => (
      <MessageAttachment
        key={`file_attachment_${attachment.url}`}
        attachment={attachment}
        onImagePreview={onImagePreview}
      />
    )) ?? [];

  return (
    <>
      {messageDateDivider && (
        <div className="date_container">
          <div className="date">{messageDateDivider}</div>
        </div>
      )}
      <div
        id={`message-${message.id}`}
        className={`message  ${message.income ? "" : "self"} ${
          message.combineWithPrevious ? "not-main" : ""
        } ${props.active ? "active" : ""}`}
      >
        <div className="message-wrapper">
          <div className="avatar avatar-sm">
            {message.user ? (
              <AvatarThumb
                size={36}
                img={message.user.avatar}
                round={true}
                textSizeRatio={2}
                name={message.user.username}
                textLength={2}
              />
            ) : (
              <Icon name={"robot_icon"} fill="#70acdd" size="xl" />
            )}
          </div>
          <div className={`message-container`}>
            <Dropdown
              disabled={dropdownMenuDisabled}
              overlay={DropDownMenu(message)}
              overlayStyle={{ animationDelay: "0s", animationDuration: "0s" }}
              onVisibleChange={(visible) => {
                if (visible) {
                  setDropdownMenuOpen(false);
                }
                onDropdownOpen(visible);
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
                    {renderReplyAttachments.length > 0 && (
                      <div className="msg_file_container">
                        {renderReplyAttachments}
                      </div>
                    )}
                    <div className="msg_text_container">
                      <ReactMarkdown
                        className="message-markdown-container"
                        children={message.reply.content}
                        allowedElements={["a"]}
                        unwrapDisallowed={true}
                        linkTarget="_blank"
                      />
                    </div>
                    <div className="msg_type">
                      <MessageCommentLink
                        link={
                          messageReplyTo?.entity?.data?.url ??
                          message.entity.data.url
                        }
                        type={
                          messageReplyTo?.entity?.type ?? message.entity.type
                        }
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {renderAttachments.length > 0 && (
                  <div className="msg_file_container">{renderAttachments}</div>
                )}
                <div className="msg_text_container">
                  <ReactMarkdown
                    className="message-markdown-container"
                    children={message.content}
                    allowedElements={["a", "p"]}
                    unwrapDisallowed={true}
                    linkTarget="_blank"
                  />
                </div>
                <MessageOptions message={message} />
              </div>
            </Dropdown>
            <div className="msg_menu-container">
              <div className="msg_menu">
                <Dropdown
                  disabled={dropdownMenuDisabled}
                  visible={dropdownMenuOpened}
                  onVisibleChange={(visible) => {
                    setDropdownMenuOpen(visible);
                    onDropdownOpen(visible);
                  }}
                  overlay={DropDownMenu(message)}
                  overlayStyle={{
                    animationDelay: "0s",
                    animationDuration: "0s",
                  }}
                  placement="bottomLeft"
                  trigger={["click"]}
                >
                  <MoreOutlined className="dropdown-trigger" />
                </Dropdown>
              </div>
              {message.edited && (
                <div className="editted_icon">
                  <Icon name={"icon_pencil_alt"} fill="#262626" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default MessageComponent;
