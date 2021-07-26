import React, { useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import ReactMarkdown from "react-markdown";
import IStores, {
  IChatStore,
  IContactStore,
  IUserStore,
  IAppStore,
} from "@/stores/interface";
import { Icon } from "@/ui";
import $ from "jquery";
import { Input, Button } from "antd";
import { TypesMessage } from "@/stores/classes";
import { CloseOutlined } from "@ant-design/icons";
import { User } from "../../../entities";
import FileUploadModal from "./FileUploadModal";

type IProps = {
  chatStore?: IChatStore;
  contactStore?: IContactStore;
  userStore?: IUserStore;
  appStore?: IAppStore;
};

const ALL_ACCEPT_TYPE = "file_extension|audio/*|video/*|image/*|media_type";
const INSTAGRAM_ACCEPT_TYPE = "image/*";

const Inputer = inject((stores: IStores) => ({
  chatStore: stores.chatStore,
  contactStore: stores.contactStore,
  userStore: stores.userStore,
  appStore: stores.appStore,
}))(
  observer((props: IProps) => {
    const { chatStore, contactStore, userStore, appStore } = props;

    const { TextArea } = Input;

    const activeContact = contactStore.activeContact;
    const hero: User = userStore.hero;
    const activeSocial = chatStore.activeChat.activeSocial;

    const [draft, setDraft] = useState({});
    const [switcher, setSwitcher] = useState("");
    const [status, setStatus] = useState("default");
    const [acceptType, setAcceptType] = useState(
      activeSocial === "instagram" ? INSTAGRAM_ACCEPT_TYPE : ALL_ACCEPT_TYPE
    );
    const [fileOnHold, setFileOnHold] = useState([]);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    let currentChat: any;
    if (chatStore.isLoaded && activeContact) {
      currentChat = chatStore.activeChat;
    }

    const [keys, setKeys] = useState({
      shift: false,
      alt: false,
      ctrl: false,
    });

    const handleKeyDown = (e: any) => {
      switch (e.key) {
        case "Control":
          setKeys({ ...keys, ctrl: true });
          break;
        case "Shift":
          setKeys({ ...keys, shift: true });
          break;
        case "Alt":
          setKeys({ ...keys, alt: true });
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e: any) => {
      switch (e.key) {
        case "Control":
          setKeys({ ...keys, ctrl: false });
          break;
        case "Shift":
          setKeys({ ...keys, shift: false });
          break;
        case "Alt":
          setKeys({ ...keys, alt: false });
          break;
        default:
          break;
      }
    };

    const resetInputAndKeys = () => {
      setKeys({ alt: false, ctrl: false, shift: false });
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

    const onChange = (name: string, value: string, event: any) => {
      setDraft({ ...draft, [name + status]: value });
    };

    const selectSocial = (social: string) => {
      currentChat.activeSocial = social;
      switcherOff();
    };

    const switcherOff = () => {
      setSwitcher("");
    };

    if (inputRef && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }

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
      if (keys.alt || keys.shift || keys.ctrl) {
      } else {
        clearFiles();
        sendMessage();
      }
    };

    const sendMessage = async () => {
      let message = draft[activeContact.id + status];

      if (
        (draft[activeContact.id + status] &&
          draft[activeContact.id + status].length) ||
        fileOnHold.length > 0
      ) {
        switch (status) {
          case "default":
            resetInputAndKeys();
            chatStore.addMsg(
              draft[activeContact.id + status],
              hero.id,
              currentChat.activeSocial,
              null,
              fileOnHold
            );
            chatStore.sendMessage(
              draft[activeContact.id + status],
              activeContact.sourceAccountId,
              appStore.getActiveSchools(),
              fileOnHold,
              currentChat.activeMessage
            );

            break;
          case "edit":
            resetInputAndKeys();
            setStatus("default");
            chatStore.setActiveMessage(null);
            chatStore.activeChat.activeMessage.editMessage(
              draft[activeContact.id + status]
            );

            break;
          case "reply":
            resetInputAndKeys();
            setStatus("default");

            chatStore.addMsg(
              message,
              hero.id,
              currentChat.activeSocial,
              chatStore.activeChat.activeMessage.content,
              fileOnHold
            );
            chatStore.setActiveMessage(null);
            break;
          default:
            break;
        }
      }

      $(".main_input input").val("");

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
      switcher === "attachments" ? setSwitcher("") : setSwitcher("attachments");
    };

    let sendEnabled =
      draft[activeContact.id + status] &&
      draft[activeContact.id + status].length > 0;
    let chatError = false;
    let acceptAttachments = !!chatError || !activeContact.sendFile;

    return (
      <div className={`inputer ${!!chatError ? "has-error" : ""}`}>
        <FileUploadModal
          clearFiles={clearFiles}
          deleteFileOnHold={deleteFileOnHold}
          changeFileOnHold={changeFileOnHold}
          openFileInput={openFileInput}
          handleKeyDown={handleKeyDown}
          handleKeyUp={handleKeyUp}
          handleEnter={handleEnter}
          onChange={onChange}
          setSwitcher={setSwitcher}
          switcher={switcher}
          messageContent={draft[activeContact.id + status]}
          inputRef={inputRef}
          fileOnHold={fileOnHold}
          activeContactId={activeContact.id}
        />

        <div className="input-container">
          {/* Button Attachment */}
          <div className="inputer_btn">
            <Button
              disabled={acceptAttachments}
              onClick={openFileInput}
              className="transparent"
            >
              <Icon className="icon_m lite-grey" name="icon_clip" />
            </Button>
          </div>

          <div className="main_input">
            {!!chatError ? (
              <div className="input-error">{chatError}</div>
            ) : (
              <>
                {chatStore.activeChat.activeMessage && (
                  <div className="selected-container">
                    <span>
                      <ReactMarkdown
                        children={chatStore.activeChat.activeMessage.content}
                        allowedElements={["a"]}
                        unwrapDisallowed={true}
                        linkTarget="_blank"
                      />
                    </span>
                    <div className="msg_type">
                      {TypesMessage.getTypeDescription(
                        chatStore.activeChat.activeMessage.entity.type
                      )}
                    </div>
                    <CloseOutlined
                      className="close"
                      onClick={() => chatStore.setActiveMessage(null)}
                    />
                  </div>
                )}

                <TextArea
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  onPressEnter={handleEnter}
                  autoSize
                  placeholder="Ваше сообщение"
                  ref={inputRef}
                  onChange={(e) =>
                    onChange(activeContact.id, e.target.value, e)
                  }
                  value={draft[activeContact.id + status]}
                />
              </>
            )}
          </div>

          {/* Button Social.  */}
          <div className="inputer_btn">
            {/* TODO: temporarily disable, enable after meeting task */}
            {/*<Popover*/}
            {/*  visible={switcher === "social"}*/}
            {/*  content={<SocialMenu selectSocial={selectSocial} />}*/}
            {/*  trigger="click"*/}
            {/*>*/}
            {/*  <Button*/}
            {/*    disabled={!!chatError}*/}
            {/*    onClick={() => setSwitcher("social")}*/}
            {/*    className="transparent not-allowed"*/}
            {/*  >*/}
            <Icon
              className="icon_l"
              name={`social_media_${
                currentChat.activeSocial ? currentChat.activeSocial : ""
              }`}
            />
            {/*</Button>*/}
            {/*</Popover>*/}
          </div>
        </div>

        <Button
          disabled={!!chatError || !sendEnabled}
          onClick={sendMessage}
          className="send_btn"
        >
          <Icon className="icon_x lite-grey" name="icon_button_send" />
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
    );
  })
);

export default Inputer;
