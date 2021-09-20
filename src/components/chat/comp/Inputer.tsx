import { useState, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import $ from "jquery";
import { Button } from "antd";
import { TypesMessage } from "@/stores/classes";
import { CloseOutlined } from "@ant-design/icons";
import FileUploadModal from "./FileUploadModal";
import { InputerTextArea } from "./InputerTextArea";
import { useStore } from "@/stores";
import { SocialIcon } from "@/components/SocialIcon";
import { IconButtonSend, IconClip } from "@/images/icons";

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
        <div className="up_main_input">
          {currentChat.activeMessage && (
            <div className="selected-container">
              <div className="selected-container_left">
                <span>
                  <ReactMarkdown
                    children={currentChat.activeMessage.content}
                    allowedElements={["a"]}
                    unwrapDisallowed={true}
                    linkTarget="_blank"
                  />
                </span>
                <div className="msg_type">
                  {TypesMessage.getTypeDescription(
                    currentChat.activeMessage.entity.type
                  )}
                </div>
              </div>
              <div className="selection-container_right">
                <CloseOutlined
                  className="close"
                  onClick={() => currentChat.setActiveMessage(null)}
                />
              </div>
            </div>
          )}
        </div>
        {/* Button Attachment */}
        <div className="down_main_input">
          <div className="inputer_btn">
            <Button
              disabled={acceptAttachments}
              onClick={openFileInput}
              className="transparent"
            >
              <IconClip width={24} height={24} fill="#a3a3a3" />
            </Button>
          </div>

          <div className="main_input">
            {/* TODO: temporary hide by PROD-2331 Fixed Error */}
            {chatError ? (
              <div className="input-error">{chatError}</div>
            ) : (
              <>
                <InputerTextArea
                  autoSize
                  onPaste={onPasteToTextArea}
                  value={draft[activeContact.id + status]}
                  onChange={(e) => {
                    onChange(activeContact.id, e.target.value, e);
                  }}
                  onPressEnter={handleEnter}
                />
              </>
            )}
          </div>

          {/* Button Social.  */}
          <div className="inputer_btn">
            <SocialIcon social={activeSocial} size={30} />
          </div>

          <Button
            disabled={!!chatError || !sendEnabled}
            onClick={sendMessage}
            className="send_btn"
          >
            <IconButtonSend width={36} height={36} fill="#a3a3a3" />
          </Button>
          <input
            type="file"
            hidden
            accept={acceptType}
            name="files"
            ref={fileInputRef}
            // multiple
            onChange={handleFileInput}
          />
        </div>
      </div>
    </div>
  );
});

export default Inputer;
