import { useState, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import $ from "jquery";
import FileUploadModal from "./FileUploadModal";
import { useStore } from "@/stores";
import ReplyCurrentMessage from "@/components/chat/comp/ReplyCurrentMessage";
import MessageTransmitter from "@/components/chat/comp/MessageTransmitter";
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

    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      const position = e.target.selectionEnd;
      e.target.setRangeText("\n", position, position, "end");
      setDraft({
        ...draft,
        [activeContact.id + status]: e.target.value,
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
    // let message = draft[activeContact.id + status];
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
        //   currentChat.setActiveMessage(null);
        //   currentChat.activeMessage.editMessage(
        //     draft[activeContact.id + status]
        //   );
        //
        //   break;
        // case "reply":
        //   setStatus("default");
        //
        //   currentChat.setActiveMessage(null);
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
    }
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  let sendEnabled =
    draft[activeContact.id + status] &&
    draft[activeContact.id + status].length > 0;
  let chatError = false;
  let acceptAttachments = chatError || !activeContact.sendFile;
  return (
    <div className={`inputer ${chatError ? "has-error" : ""}`}>
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
        {chatError ? (
          <div className="input-error">{chatError}</div>
        ) : (
          <>
            <ReplyCurrentMessage currentChat={currentChat} />
            <MessageTransmitter
              sendMessage={sendMessage}
              acceptAttachments={acceptAttachments}
              acceptType={acceptType}
              activeContact={activeContact}
              activeSocial={activeSocial}
              chatError={chatError}
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
