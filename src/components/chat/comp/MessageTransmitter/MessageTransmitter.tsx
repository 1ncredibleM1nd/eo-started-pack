import { MutableRefObject } from "react";
import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Button } from "antd";
import { InputerTextArea } from "@/components/chat/comp/InputerTextArea";
import Conversation from "@/api/Conversation";
import { Icon } from "@/ui/Icon/Icon";
import { useClassName } from "@/hooks/useClassName";
import "./MessageTransmitter.scss";
import { useStore } from "@/stores";
import { ChatStore } from "@/stores/implementation/ChatStore";
import SymbolsCounter from "@/components/chat/comp/MessageTransmitter/SymbolsCounter";

type TProps = {
  currentChat: ChatStore;
  symbolsCount: number;
  acceptAttachments: boolean;
  openFileInput: () => void;
  onPasteToTextArea: (ev: ClipboardEvent) => void;
  draft: {};
  status: string;
  activeContact?: Conversation;
  handleEnter: (e: any) => Promise<void>;
  activeSocial: string | undefined;
  sendEnabled: any;
  sendMessage: () => Promise<void>;
  acceptType: string;
  handleFileInput: (e: any) => void;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  onChange: (name: string, value: string) => void;
};

export const MessageTransmitter = observer((props: TProps) => {
  const {
    currentChat,
    symbolsCount,
    acceptAttachments,
    openFileInput,
    onPasteToTextArea,
    draft,
    status,
    activeContact,
    handleEnter,
    activeSocial,
    sendEnabled,
    sendMessage,
    acceptType,
    handleFileInput,
    fileInputRef,
    onChange,
  } = props;

  const { contactStore } = useStore();
  const { cn } = useClassName("message-transmitter");

  const maxMessageSymbols =
    currentChat.activeMessage?.entity.type === "comment"
      ? contactStore.activeContact?.restrictions.maxCommentSymbols
      : contactStore.activeContact?.restrictions.maxMessageSymbols;

  return (
    <>
      <div className={cn()}>
        <div className={cn({ wrapper: "clip" })}>
          <Button
            disabled={acceptAttachments}
            onClick={openFileInput}
            className="transparent"
          >
            <Icon name={"icon_clip"} size="md" fill="#a3a3a3" />
          </Button>
        </div>

        <div className={cn("input-text-area-wrapper")}>
          <>
            <InputerTextArea
              autoSize
              onPaste={onPasteToTextArea}
              value={draft[activeContact.id + status] ?? ""}
              onChange={(value) => onChange(activeContact.id, value)}
              onPressEnter={handleEnter}
            />
          </>
        </div>
        <div
          className={css`
            padding-top: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            align-items: flex-start;
          `}
        >
          {symbolsCount > 0 ? (
            <SymbolsCounter count={symbolsCount} maxCount={maxMessageSymbols} />
          ) : null}

          <div
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            <div className={cn({ wrapper: "social" })}>
              <Icon name={`social_media_${activeSocial}`} size={"md"} />
            </div>

            <Button
              disabled={!sendEnabled}
              onClick={sendMessage}
              className={cn("button-send")}
            >
              <Icon name={"icon_button_send"} size="xl" />
            </Button>
          </div>
        </div>
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
    </>
  );
});
