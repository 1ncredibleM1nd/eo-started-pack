import { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import "./Chat.scss";
import Inputer from "./comp/Inputer";
import PuffLoader from "react-spinners/PuffLoader";
import ChatPlaceholder from "./comp/ChatPlaceholder";
import { Message } from "@/stores/model";
import dayjs, { toCalendar } from "@/services/dayjs";
import MessageComponent from "@/components/chat/comp/MessageComponent";
import { useStore } from "@/stores";
import { useInView } from "react-intersection-observer";

type TChatListProps = {
  messages: Message[];
  activeMessageId: number;
  loading: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onLoadNext: () => void;
  onLoadPrev: () => void;
  onReplyMessage: (message: Message) => void;
};

const ChatListLoading = observer(() => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PuffLoader color="#3498db" size={50} />
    </div>
  );
});

const ChatList = observer(
  ({
    messages,
    activeMessageId,
    loading,
    hasNext,
    hasPrev,
    onLoadNext,
    onLoadPrev,
    onReplyMessage,
  }: TChatListProps) => {
    let prevDateDivider = "";
    const scrollableRootRef = useRef<HTMLDivElement | null>(null);
    const lastScrollDistanceToBottomRef = useRef<number>();
    const [scrollLocked, setScrollLocked] = useState(false);
    const { ref: sentryPrevRef, inView: isVisiblePrev } = useInView({});
    const { ref: sentryNextRef, inView: isVisibleNext } = useInView({});

    const rootRefSetter = useCallback((node: HTMLDivElement) => {
      scrollableRootRef.current = node;
    }, []);

    const handleRootScroll = useCallback(() => {
      const rootNode = scrollableRootRef.current;
      if (rootNode) {
        lastScrollDistanceToBottomRef.current =
          rootNode.scrollHeight - rootNode.scrollTop;
      }
    }, []);

    const canLockScroll = useMemo(
      () =>
        scrollLocked &&
        (scrollableRootRef.current?.scrollHeight ?? 0) >
          (scrollableRootRef.current?.clientHeight ?? 0),
      [scrollLocked, scrollableRootRef]
    );

    useEffect(() => {
      const scrollableRoot = scrollableRootRef.current;
      const lastScrollDistanceToBottom =
        lastScrollDistanceToBottomRef.current ?? 0;
      if (scrollableRoot) {
        scrollableRoot.scrollTop =
          scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
      }
    }, [messages]);

    useEffect(() => {
      if (isVisiblePrev) {
        onLoadPrev();
      }
    }, [isVisiblePrev]);

    useEffect(() => {
      if (isVisibleNext) {
        onLoadNext();
      }
    }, [isVisibleNext]);

    return (
      <div
        id={"chat-scroller"}
        className={`msg_space ${canLockScroll ? "lock-scroll" : ""}`}
        ref={rootRefSetter}
        onScroll={handleRootScroll}
      >
        {hasNext && (
          <div ref={sentryNextRef}>
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
                active={activeMessageId === message.id}
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

        {hasPrev && (
          <div ref={sentryPrevRef}>
            <ChatListLoading />
          </div>
        )}
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
            activeMessageId={activeChat.messageId}
            loading={activeChat.pageLoading}
            hasNext={activeChat.hasNextPage}
            hasPrev={activeChat.hasPrevPage}
            onLoadNext={() => {
              activeChat.loadNext(activeContact.id);
            }}
            onLoadPrev={() => {
              activeChat.loadPrev(activeContact.id);
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
