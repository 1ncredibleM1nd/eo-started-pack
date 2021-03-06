import { useState, useRef, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import $ from "jquery";
import FileUploadModal from "./FileUploadModal";
import { css } from "goober";
import { useStore } from "@/stores";
import ReplyCurrentMessage from "@/components/chat/comp/ReplyCurrentMessage";
import MessageTransmitter from "@/components/chat/comp/MessageTransmitter";
import ErrorDialogInfo from "@/components/chat/comp/MessageTransmitter/ErrorDialogInfo";
import { notification } from "antd";
import { WarningOutlined } from "@ant-design/icons";
const ALL_ACCEPT_TYPE = "file_extension|audio/*|video/*|image/*|media_type";
const INSTAGRAM_ACCEPT_TYPE = "image/*";

const Inputer = observer(() => {
  const { contactStore, schoolsStore } = useStore();

  const activeContact = contactStore.activeContact;
  const activeSocial = activeContact?.activeSocial;
  const currentChat = activeContact?.chat;

  const [draft, setDraft] = useState({});
  const [status, setStatus] = useState("default");
  const [acceptType, setAcceptType] = useState(
    activeSocial === "instagram" ? INSTAGRAM_ACCEPT_TYPE : ALL_ACCEPT_TYPE
  );
  const [fileOnHold, setFileOnHold] = useState([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [symbols, setSymbols] = useState(0);
  const [sendEnabled, setSendEnabled] = useState(false);

  // TODO: move logic to custom SendButton
  useEffect(() => {
    const hasText = draft[activeContact.id + status]?.length > 0;

    const hasMaxMessageSymbols =
      symbols > activeContact?.restrictions.maxMessageSymbols;

    const hasMaxCommentSymbols =
      currentChat?.activeMessage &&
      symbols > activeContact?.restrictions.maxCommentSymbols;

    setSendEnabled(hasText && !hasMaxMessageSymbols && !hasMaxCommentSymbols);
  }, [draft, currentChat?.activeMessage]);

  const resetInputAndKeys = () => {
    if (status !== "default") {
      setDraft({
        ...draft,
        [activeContact.id + "default"]: "",
        [activeContact.id + status]: "",
      });
    } else {
      setDraft({ ...draft, [activeContact.id + status]: "" });
    }
  };

  const onChange = useCallback(
    (name: string, value: string) => {
      setDraft({ ...draft, [name + status]: value });
      setSymbols(value.length);
    },
    [draft, status]
  );

  const handleFileInput = (e: any) => {
    e.preventDefault();
    setFileOnHold([...fileOnHold, ...e.target.files]);
  };

  const deleteFileOnHold = (index: number) => {
    fileInputRef.current.value = "";
    let fileOnHoldCopy = fileOnHold.slice();
    fileOnHoldCopy.splice(index, 1);
    setFileOnHold(fileOnHoldCopy);
  };

  const changeFileOnHold = async (index: number) => {
    await deleteFileOnHold(index);
    await fileInputRef.current.click();
  };

  if (!currentChat) {
    return <div className="chat">Loading</div>;
  }

  const clearFiles = () => {
    setFileOnHold([]);
    fileInputRef.current.value = null;
  };

  const handleEnter = async (e: any) => {
    e.preventDefault();
    const moreMessageLimit =
      symbols > activeContact?.restrictions.maxMessageSymbols;
    const moreCommentLimit =
      currentChat?.activeMessage &&
      symbols > activeContact?.restrictions.maxCommentSymbols;

    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      const position = e.target.selectionEnd;
      e.target.setRangeText("\n", position, position, "end");
      setDraft({
        ...draft,
        [activeContact.id + status]: e.target.value,
      });
    } else if (moreCommentLimit || moreMessageLimit) {
      notification.open({
        message: "???????????????????? ?????????? ????????????????",
        description:
          "???????? ?????????????????? ???? ????????????????????, ?????? ?????? ?????????????????? ???????????????????? ????????????????, ?????????????????????? ???????????????????? ??????????",
        icon: <WarningOutlined style={{ color: "#ef8079" }} />,
        placement: "topRight",
      });
    } else {
      clearFiles();
      sendMessage();
    }
  };

  const onPasteToTextArea = (ev: ClipboardEvent) => {
    setFileOnHold([...fileOnHold, ...ev.clipboardData.files]);
  };

  const sendMessage = async () => {
    if (
      (draft[activeContact.id + status] &&
        draft[activeContact.id + status].length) ||
      fileOnHold.length > 0
    ) {
      resetInputAndKeys();

      switch (status) {
        case "default":
          activeContact.sendMessage(
            activeContact.id,
            draft[activeContact.id + status],
            activeContact.sourceAccountId,
            schoolsStore.activeSchoolsIds,
            fileOnHold,
            currentChat.activeMessage
          );

          break;
        // case "edit":
        //   resetInputAndKeys();
        //   setStatus("default");
        //   currentChat.setActiveMessage(undefined);
        //   currentChat.activeMessage.editMessage(
        //     draft[activeContact.id + status]
        //   );
        //
        //   break;
        // case "reply":
        //   setStatus("default");
        //
        //   currentChat.setActiveMessage(undefined);
        //   currentChat.addMsg(
        //     message,
        //     user.id,
        //     activeSocial,
        //     currentChat.activeMessage.content,
        //     fileOnHold
        //   );
        //   break;
        default:
          break;
      }
    }

    if (
      draft[activeContact.id + status] &&
      draft[activeContact.id + status] !== ""
    ) {
      setTimeout(() => {
        $(".msg_space").animate(
          { scrollTop: $(".msg_space").prop("scrollHeight") },
          0
        );
      });

      setSymbols(0);
    }
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  let chatError = {
    isError: false,
    commentError: {
      commentTitle: "",
      commentText: "",
    },
  };

  if (activeContact.restrictions.cannotSend) {
    chatError.isError = true;
    chatError.commentError.commentTitle =
      activeContact?.restrictions.cannotSend;
    chatError.commentError.commentText = "";
  } else if (
    activeContact.restrictions.cannotSendMessageInsta &&
    !activeContact.chat.activeMessage
  ) {
    chatError.isError = activeContact?.restrictions.cannotSendMessageInsta;
    chatError.commentError.commentTitle =
      "???????????????? ?????????????????? ?? ???????????? ????????????????????, ???????????? ?????? ???????????? ???? ?????????? ?????? ?? ???????????? ??????????????????";
    chatError.commentError.commentText =
      "?? ?????? ???????? ?????????????????????? ???????????????? ?????? ?????? ????????????. ?????? ?????????? ???????????????? ?? ???????????????????? ???????? ?????????????????????? ?????????????????????? ?????????? ?????????????????? ?? ????????????????????????";
  }
  let acceptAttachments =
    chatError.isError || !activeContact?.restrictions.canSendFile;

  return (
    <div className={`inputer ${chatError.isError ? "has-error" : ""}`}>
      <FileUploadModal
        clearFiles={clearFiles}
        deleteFileOnHold={deleteFileOnHold}
        changeFileOnHold={changeFileOnHold}
        openFileInput={openFileInput}
        handleEnter={handleEnter}
        onChange={onChange}
        messageContent={draft[activeContact.id + status]}
        fileOnHold={fileOnHold}
        activeContactId={activeContact.id}
      />
      <div className="input-container">
        {chatError.isError ? (
          <ErrorDialogInfo chatError={chatError} />
        ) : (
          <>
            <ReplyCurrentMessage currentChat={currentChat} />
            <MessageTransmitter
              currentChat={currentChat}
              symbolsCount={symbols}
              sendMessage={sendMessage}
              acceptAttachments={acceptAttachments}
              acceptType={acceptType}
              activeContact={activeContact}
              activeSocial={activeSocial}
              handleEnter={handleEnter}
              status={status}
              handleFileInput={handleFileInput}
              openFileInput={openFileInput}
              draft={draft}
              onPasteToTextArea={onPasteToTextArea}
              sendEnabled={sendEnabled}
              fileInputRef={fileInputRef}
              onChange={onChange}
            />
          </>
        )}
      </div>
    </div>
  );
});

export default Inputer;
