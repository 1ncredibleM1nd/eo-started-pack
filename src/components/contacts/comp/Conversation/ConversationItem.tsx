import { observer } from "mobx-react-lite";
import dayjs, { toCalendar } from "@/services/dayjs";
import { Badge } from "antd";
import {
  Message,
  Conversation,
  TConversationDialogStatus,
} from "@/stores/model";
import ReactMarkdown from "react-markdown";
import { Dropdown } from "antd";
import { Icon } from "@/ui/Icon/Icon";
import { useStore } from "@/stores";
import { MoreOutlined } from "@ant-design/icons";
import { css } from "goober";
import { classnames } from "@/utils/styles";
import ConversationTag from "@/components/contacts/comp/Tags";
import { ConversationWrapper } from "@/components/contacts/comp/Conversation/ConversationWrapper";
import ConversationContextMenu from "./ConversationContextMenu";
import AvatarThumb from "@/components/AvatarThumb";

type IProps = {
  index: number;
  lastMessage: Message;
  contact: Conversation;
  online: any;
  active: any;
  selectContact: any;
  isIAm: boolean;
  isManager: boolean;
  school: any;
  onChangeStatus?: (id: number, status: TConversationDialogStatus) => void;
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
    onChangeStatus,
  }: IProps) => {
    let social_media: string = "";
    const { authStore } = useStore();

    if (lastMessage) {
      social_media = lastMessage.social_media;
    }

    let tags = [];

    let max = contact.tags.length > 5 ? 5 : contact.tags.length;

    for (let i = 0; i < max; i++) {
      tags.push(contact.tags[i]);
    }

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
      <div
        onClick={() => selectContact(contact)}
        className={`contacts-item contacts-item-${index} friends ${
          active && "active"
        }`}
      >
        <div className="avatar">
          <Badge className={`online_dot ${active && "active"}`} dot={online}>
            <AvatarThumb
              size={48}
              img={contact.user.avatar}
              round={true}
              textSizeRatio={1.75}
              name={contact.user.username}
              textLength={2}
            />
          </Badge>
        </div>

        <div className="contacts-content">
          <div className="contacts-info">
            <div className={"contacts-school-icon"}>
              <AvatarThumb
                size={18}
                img={school.logo}
                round={true}
                textSizeRatio={2}
                name={school.name}
                textLength={1}
                className="school-logo"
              />
            </div>

            <div className={"contacts-school-icon"}>
              <div className={`social_media_icon ${social_media}`}>
                <Icon name={`social_media_${social_media}`} />
              </div>
            </div>

            <h4 className="chat-name user_name_to">{contact.user.username}</h4>
            <div className="chat-time">
              {lastMessage && <>{contactTime(lastMessage)}</>}
            </div>

            <Dropdown
              overlay={ConversationContextMenu({
                status: contact.dialogStatus,
                onChangeStatus: onChangeStatus,
                contactId: contact.id,
                isFrame: authStore.isFrame,
              })}
              overlayStyle={{ animationDelay: "0s", animationDuration: "0s" }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div
                className="contactItem_img"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="contactItem_img_icon">
                  <MoreOutlined
                    className="dropdown-trigger"
                    style={{ fontSize: "18px" }}
                  />
                </div>
              </div>
            </Dropdown>
          </div>
          <div className="contacts-texts">
            {lastMessage ? (
              <div className={`last_msg ${contact.dialogStatus}`}>
                {lastMessage?.entity?.type.includes("comment") && (
                  <Icon name={"icon_comment"} className="icon_comment" />
                )}
                {isManager ? (
                  <div className="from">
                    {`${
                      isIAm
                        ? "????"
                        : lastMessage.user?.username.trim() ?? "????????????"
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
                {contact.dialogStatus !== "" && (
                  <div
                    className={classnames(
                      css`
                        position: absolute;
                        padding: 4px;
                        border-radius: 50%;
                        background: transparent;
                        right: 5px;

                        &.unread {
                          background: #3498db;
                          border: 2px solid #3498db;
                          bottom: 6px;
                        }

                        &.unanswer {
                          background: transparent;
                          border: 2px solid #3498db;
                          bottom: 4px;
                        }
                      `,
                      contact.dialogStatus
                    )}
                  ></div>
                )}
              </div>
            ) : (
              <div className={`last_msg ${contact.dialogStatus}`}>
                *???????????????? ?? ????????????????*
              </div>
            )}
          </div>

          <ConversationWrapper>
            {tags.map((tagId) => (
              <ConversationTag key={tagId} id={tagId} isButton={false} />
            ))}

            {tags.length != 0 && contact.tags.length > tags.length ? (
              <ConversationTag isButton={true} />
            ) : (
              ""
            )}
          </ConversationWrapper>
        </div>
      </div>
    );
  }
);
