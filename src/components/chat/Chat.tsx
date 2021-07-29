import React from "react";
import { observer } from "mobx-react-lite";
import "./Chat.scss";
import Inputer from "./comp/Inputer";
import PuffLoader from "react-spinners/PuffLoader";
import ChatPlaceholder from "./comp/ChatPlaceholder";
import { Message } from "../../entities";
import dayjs, { toCalendar } from "@/services/dayjs";
import MessageComponent from "@/components/chat/comp/MessageComponent";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useStore } from "@/stores";

const ChatListLoading = observer(() => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PuffLoader color="#3498db" size={50} />
    </div>
  );
});

const ChatList = observer(
  ({ messages, loading, hasNextPage, onLoadMore, onReplyMessage }) => {
    let prevDateDivider = "";

    const [infiniteRef, { rootRef }] = useInfiniteScroll({
      loading,
      hasNextPage,
      onLoadMore,
      disabled: false,
    });

    const scrollableRootRef = React.useRef<HTMLDivElement | null>(null);
    const lastScrollDistanceToBottomRef = React.useRef<number>();

    React.useEffect(() => {
      const scrollableRoot = scrollableRootRef.current;
      const lastScrollDistanceToBottom =
        lastScrollDistanceToBottomRef.current ?? 0;
      if (scrollableRoot) {
        scrollableRoot.scrollTop =
          scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
      }
    }, [messages, rootRef]);

    const rootRefSetter = React.useCallback(
      (node: HTMLDivElement) => {
        rootRef(node);
        scrollableRootRef.current = node;
      },
      [rootRef]
    );

    const handleRootScroll = React.useCallback(() => {
      const rootNode = scrollableRootRef.current;
      if (rootNode) {
        lastScrollDistanceToBottomRef.current =
          rootNode.scrollHeight - rootNode.scrollTop;
      }
    }, []);

    return (
      <div
        id={"chat-scroller"}
        className={"msg_space"}
        ref={rootRefSetter}
        onScroll={handleRootScroll}
      >
        {hasNextPage && (
          <div ref={infiniteRef}>
            <ChatListLoading />
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: "100%",
          }}
        >
          {messages.map((message: Message) => {
            const messageDateDivider = toCalendar(
              dayjs(message.timestamp * 1000)
            );
            const currentDateDivider =
              prevDateDivider !== messageDateDivider
                ? messageDateDivider
                : null;

            prevDateDivider = messageDateDivider;
            return (
              <MessageComponent
                key={`message_${message.id}`}
                message={message}
                replyMsg={onReplyMessage}
                messageDateDivider={currentDateDivider}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

const Chat = observer(() => {
  const { chatStore, contactStore } = useStore();

  const activeChat = chatStore.activeChat;
  const activeContact = contactStore.activeContact;

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
  };

  return (
    <div className="chat position-relative">
      {activeChat && activeContact ? (
        <>
          <ChatList
            messages={activeChat?.messages}
            loading={chatStore.isLoadingPage}
            hasNextPage={chatStore.hasNextPage}
            onLoadMore={() => {
              chatStore.loadMessages(
                activeContact.id,
                chatStore.getNextPageNumber
              );
            }}
            onReplyMessage={replyMsg}
          />
          <Inputer />
        </>
      ) : (
        <ChatPlaceholder />
      )}
    </div>
  );
});

export default Chat;
