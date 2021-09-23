import { useRef, useEffect, useCallback, useState, useMemo } from "react";
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

    const scrollableRootRef = useRef<HTMLDivElement | null>(null);
    const lastScrollDistanceToBottomRef = useRef<number>();

    const [scrollLocked, setScrollLocked] = useState(false);
    const canLockScroll = useMemo(
      () =>
        scrollLocked &&
        (scrollableRootRef.current?.scrollHeight ?? 0) >
          (scrollableRootRef.current?.clientHeight ?? 0),
      [scrollLocked]
    );

    useEffect(() => {
      const scrollableRoot = scrollableRootRef.current;
      const lastScrollDistanceToBottom =
        lastScrollDistanceToBottomRef.current ?? 0;
      if (scrollableRoot) {
        scrollableRoot.scrollTop =
          scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
      }
    }, [messages, rootRef]);

    useEffect(() => {
      const disableScroll = (ev) => scrollLocked && ev.preventDefault();
      scrollableRootRef.current?.addEventListener(
        "mousewheel",
        disableScroll,
        false
      );

      return () =>
        scrollableRootRef.current?.removeEventListener(
          "mousewheel",
          disableScroll
        );
    }, [scrollLocked]);

    const rootRefSetter = useCallback(
      (node: HTMLDivElement) => {
        rootRef(node);
        scrollableRootRef.current = node;
      },
      [rootRef]
    );

    const handleRootScroll = useCallback(() => {
      const rootNode = scrollableRootRef.current;
      if (rootNode) {
        lastScrollDistanceToBottomRef.current =
          rootNode.scrollHeight - rootNode.scrollTop;
      }
    }, []);

    return (
      <div
        id={"chat-scroller"}
        className={`msg_space ${canLockScroll ? "lock-scroll" : ""}`}
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
              prevDateDivider !== messageDateDivider ? messageDateDivider : "";

            prevDateDivider = messageDateDivider;
            return (
              <MessageComponent
                key={`message_${message.id}`}
                message={message}
                onReplyMessage={(message: Message) => {
                  onReplyMessage(message);
                  setScrollLocked(false);
                }}
                messageDateDivider={currentDateDivider}
                onDropdownOpen={(state) => setScrollLocked(state)}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

const Chat = observer(() => {
  const { contactStore } = useStore();

  const activeChat = contactStore?.activeContact?.chat;
  const activeContact = contactStore.activeContact;

  if (!activeChat) {
    return (
      <div className="chat">
        <ChatPlaceholder />
      </div>
    );
  }

  if (!activeChat.isLoaded) {
    return (
      <div className="chat">
        <div className="loading chat_loading">
          <PuffLoader color="#3498db" size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="chat position-relative">
      {activeChat && activeContact ? (
        <>
          <ChatList
            messages={activeChat?.messages ?? []}
            loading={activeChat.isLoadingPage}
            hasNextPage={activeChat.hasNextPage}
            onLoadMore={() => {
              activeChat.loadMessages(
                activeContact.id,
                activeChat.getNextPageNumber
              );
            }}
            onReplyMessage={(message: Message) => {
              activeChat.setActiveMessage(message);
            }}
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
