import React from "react";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import { TypesMessage } from "@/stores/classes";
import { CloseOutlined } from "@ant-design/icons";
import { ChatStore } from "@/stores/implementation/ChatStore";

type TProps = {
  currentChat: ChatStore;
};

export const ReplyCurrentMessage = observer((props: TProps) => {
  const { currentChat } = props;
  return (
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
  );
});
