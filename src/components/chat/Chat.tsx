import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import IStores, { IContactStore, IUserStore } from "@/stores/interface";
import { ChatStore } from "@/stores/implementation/ChatStore";
import "./Chat.scss";
import Inputer from "./comp/Inputer";
import PuffLoader from "react-spinners/PuffLoader";
import ChatPlaceholder from "./comp/ChatPlaceholder";
import { Message } from "../../entities";
import $ from "jquery";
import moment from "moment";
import MessageComponent from "@/components/chat/comp/MessageComponent";

type IProps = {
  chatStore?: ChatStore;
  contactStore?: IContactStore;
  userStore?: IUserStore;
};

const Chat = inject((stores: IStores) => ({
  chatStore: stores.chatStore,
  contactStore: stores.contactStore,
  userStore: stores.userStore,
}))(
  observer((props: IProps) => {
    const { chatStore, contactStore } = props;

    const activeChat = chatStore.activeChat;
    const activeContact = contactStore.activeContact;

    const [switcher, setSwitcher] = useState("");
    const [reRender, setReRender] = useState(false);

    let lastDate: any;

    if (!activeChat) {
      return (
        <div className="chat">
          <ChatPlaceholder />
        </div>
      );
    }

    if (!chatStore.isLoaded) {
      return (
        <div className="chat">
          <div className="loading chat_loading">
            <PuffLoader color="#3498db" size={50} />
          </div>
        </div>
      );
    }

    const replyMsg = (message: Message) => {
      chatStore.setActiveMessage(message);
      setReRender(!reRender);
    };

    const handleScroll = () => {
      let parentPos = $(".msg_space")[0].getBoundingClientRect();
      let childPos = $(`.page-1`)[0].getBoundingClientRect();
      let topOfLastPage = childPos.top - parentPos.top;

      if (
        topOfLastPage >= -300 &&
        topOfLastPage <= -50 &&
        activeChat.messages[0].length > 29
      ) {
        chatStore.loadMessages(activeContact.id, chatStore.getNextPageNumber);
      }

      if (switcher !== "social") {
        setSwitcher("");
      }
    };

    return (
      <div className="chat position-relative">
        {activeChat && activeContact ? (
          <>
            <div
              onScroll={() => handleScroll()}
              className="msg_space"
              id={activeContact.id}
            >
              {activeChat.messages.map(
                (page: Array<Message>, index: number) => {
                  return (
                    <div
                      key={`page_${index + 1}`}
                      className={`page page-${index + 1}`}
                    >
                      {page.map((message: Message) => {
                        let messageDateDivider = null;
                        let currentDate = moment(message.date, "DD.MM");

                        if (
                          lastDate &&
                          currentDate.diff(lastDate, "days") > 0
                        ) {
                          lastDate = currentDate;
                          messageDateDivider = currentDate.format("DD.MM");
                        }

                        lastDate = currentDate;

                        return (
                          <MessageComponent
                            key={`message_${message.id}`}
                            message={message}
                            replyMsg={replyMsg}
                            messageDateDivider={messageDateDivider}
                          />
                        );
                      })}
                    </div>
                  );
                }
              )}
            </div>
            <Inputer />
          </>
        ) : (
          <ChatPlaceholder />
        )}
      </div>
    );
  })
);

export default Chat;
