import React from "react";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import { TypesMessage } from "@/stores/classes";
import { CloseOutlined } from "@ant-design/icons";
import { ChatStore } from "@/stores/implementation/ChatStore";
import "./ReplyCurrentMessage.scss";
import { useClassName } from "@/hooks/useClassName";

type TProps = {
  currentChat: ChatStore;
};

export const ReplyCurrentMessage = observer((props: TProps) => {
  const { currentChat } = props;
  const { cn } = useClassName("reply-current-message");
  return (
    <div className={cn()}>
      {currentChat.activeMessage && (
        <div className={cn("selected-container")}>
          <div className={cn({ position: "left" })}>
            <span>
              <ReactMarkdown
                children={currentChat.activeMessage.content}
                allowedElements={["a"]}
                unwrapDisallowed={true}
                linkTarget="_blank"
              />
            </span>
            <div className={cn("type")}>
              {TypesMessage.getTypeDescription(
                currentChat.activeMessage.entity.type
              )}
            </div>
          </div>
          <div className={cn({ position: "right" })}>
            <CloseOutlined
              className={cn({ button: "close" })}
              onClick={() => currentChat.setActiveMessage(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
});
