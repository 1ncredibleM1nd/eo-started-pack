import React from "react";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import { TypesMessage } from "@/stores/classes";
import { CloseOutlined } from "@ant-design/icons";
import { ChatStore } from "@/stores/implementation/ChatStore";
import "./ReplyCurrentMessage.scss";
import { useClassName } from "@/hooks/useClassName";
import { css } from "goober";
import { classnames } from "@/utils/styles";
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
          <div
            className={classnames(
              cn({ position: "left" }),
              css`
                max-width: calc(100% - 40px);
              `
            )}
          >
            <span
              className={css`
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
              `}
            >
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
