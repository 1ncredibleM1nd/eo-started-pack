import React, { MutableRefObject } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { InputerTextArea } from "@/components/chat/comp/InputerTextArea";
import Conversation from "@/ApiResolvers/Conversation";
import { Icon } from "@/ui/Icon/Icon";
import { useClassName } from "@/hooks/useClassName";
import "./MessageTransmitter.scss";

type TProps = {
  acceptAttachments: boolean;
  openFileInput: () => void;
  onPasteToTextArea: (ev: ClipboardEvent) => void;
  draft: {};
  status: string;
  activeContact: Conversation | undefined;
  handleEnter: (e: any) => Promise<void>;
  activeSocial: string | undefined;
  chatError: boolean;
  sendEnabled: any;
  sendMessage: () => Promise<void>;
  acceptType: string;
  handleFileInput: (e: any) => void;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  onChange: (name: string, value: string) => void;
};

export const MessageTransmitter = observer((props: TProps) => {
  const {
    acceptAttachments,
    openFileInput,
    onPasteToTextArea,
    draft,
    status,
    activeContact,
    handleEnter,
    activeSocial,
    chatError,
    sendEnabled,
    sendMessage,
    acceptType,
    handleFileInput,
    fileInputRef,
    onChange,
  } = props;
  const { cn } = useClassName("message-transmitter");
  return (
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
            value={draft[activeContact.id + status]}
            onChange={(e) => {
              onChange(activeContact.id, e.target.value, e);
            }}
            onPressEnter={handleEnter}
          />
        </>
      </div>
      <div className={cn({ wrapper: "social" })}>
        <Icon name={`social_media_${activeSocial}`} size={"md"} />
      </div>

      <Button
        disabled={!!chatError || !sendEnabled}
        onClick={sendMessage}
        className={cn("button-send")}
      >
        <Icon name={"icon_button_send"} size="xl" fill="#a3a3a3" />
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
});
