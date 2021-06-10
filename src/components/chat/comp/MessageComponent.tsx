import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { Icon } from "@ui";

import { Menu, Dropdown, Divider } from "antd";
import { TypesMessage } from "@stores/classes";
import { MoreOutlined } from "@ant-design/icons";
import { Message } from "@entities";
import { UserAvatar } from "@components/user_info/UserAvatar";

type IProps = {
  message?: Message;
  replyMsg?: (arg0: Message) => void;
  messageDateDivider: any;
};

const MessageComponent = observer((props: IProps) => {
  const { message, replyMsg, messageDateDivider } = props;

  console.log("message", message);

  const renderDataTimeBlock = (time: string) => (
    <div className="date_container">
      <Divider orientation="center" className="date_divider">
        <div className="date">{time}</div>
      </Divider>
    </div>
  );

  const DropDownMenu = (message: any) => {
    return (
      <Menu>
        <Menu.Item onClick={() => replyMsg(message)}>Ответить</Menu.Item>
      </Menu>
    );
  };

  const renderMessagesWrapper = (message: any) => (
    <div className="message-wrapper">
      <div
        className={`message-content ${
          message.combineWithPrevious ? "not-main" : ""
        } `}
      >
        {message.reply ? (
          <div className="reply">
            <span>{message.reply.content}</span>
            <div className="msg_type">
              {TypesMessage.getTypeDescription(message.entity.type)}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="inset_border_container">
          <div className="dummy" />
          <div className="border_hero" />
        </div>
        <div className="msg_text_container">
          {message.attachments.length > 0 && (
            <div className="msg_file_container">
              {message.attachments.map((attachment: any, index: any) => {
                console.log({ attachment });

                if (attachment.type === "file") {
                  return <div className="msg_content-document">Document</div>;
                }

                // if (attachment.type === "photo") {
                //   return (
                //     <div
                //       className={`msg_content-image ${"image_count_" + index}`}
                //     >
                //       <img src={attachment.url} alt="" />
                //     </div>
                //   );
                // }  else if (attachment.type === "audio") {
                //   return <div className="msg_content-audio">Audio</div>;
                // } else if (attachment.type === "video") {
                //   return <div className="msg_content-video">Video</div>;
                // }

                return null;
              })}
            </div>
          )}
          <Fragment>
            {" "}
            <div style={{ whiteSpace: "pre-line" }}>{message.content}</div>
          </Fragment>
        </div>
        <div className="msg_time">{message.time}</div>
        <div className="msg_menu">
          <Dropdown
            overlay={DropDownMenu(message)}
            placement="bottomLeft"
            trigger={["click"]}
          >
            <MoreOutlined className="dropdown-trigger" />
          </Dropdown>
        </div>
      </div>
    </div>
  );

  const renderUserAvatar = (user: any) => {
    if (user) {
      return (
        <UserAvatar size="36" user={user} round={true} textSizeRatio={1.75} />
      );
    } else {
      return (
        <img
          src="https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png"
          alt=""
        />
      );
    }
  };

  const renderMessagesOptions = (message: any) =>
    !message.combineWithPrevious ? (
      <div className="message-options">
        <div className="avatar avatar-sm">
          <div className={`social_media_icon ${message.social_media}`}>
            <Icon
              className="icon_s"
              name={`social_media_${message.social_media}`}
            />
          </div>
          {renderUserAvatar(message.user)}
        </div>
        <span className="message-status">
          {message.editted ? (
            <div className="editted_icon">
              <Icon className="active-grey" name={`solid_pencil-alt`} /> Редак.
            </div>
          ) : (
            ""
          )}
          <div className="msg_username">{message.username}</div>
          <div className="msg_type">
            {TypesMessage.getTypeDescription(message.entity.type)}
          </div>
        </span>
      </div>
    ) : (
      ""
    );

  if (message.income) {
    return (
      <>
        {messageDateDivider && renderDataTimeBlock(messageDateDivider)}
        {/*{!message.readed ? renderDataContainerUnread() : ' '}*/}
        <div
          key={Math.random()}
          className={`message ${
            message.combineWithPrevious ? "not-main" : ""
          } `}
        >
          {renderMessagesWrapper(message)}
          {renderMessagesOptions(message)}
        </div>
      </>
    );
  } else {
    return (
      <>
        {messageDateDivider && renderDataTimeBlock(messageDateDivider)}
        <div
          key={Math.random()}
          className={`message self ${
            message.combineWithPrevious ? "not-main" : ""
          } `}
        >
          {renderMessagesWrapper(message)}
          {renderMessagesOptions(message)}
        </div>
      </>
    );
  }
});

export default MessageComponent;
