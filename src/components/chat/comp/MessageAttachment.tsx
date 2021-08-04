import React from "react";
import { observer } from "mobx-react-lite";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { MessageAttachmentImage } from "@/components/chat/comp/MessageAttachmentImage";
import { MessageAttachmentFile } from "@/components/chat/comp/MessageAttachmentFile";
import { MessageAttachmentUnsupported } from "@/components/chat/comp/MessageAttachmentUnsupported";
import type { TMessageAttachment } from "@/types/message";
import { MessageAttachmentLink } from "@/components/chat/comp/MessageAttachmentLink";
import { css } from "goober";

type TProps = { attachment: TMessageAttachment };

export const MessageAttachment = observer(({ attachment }: TProps) => {
  if (attachment.type === "file") {
    return <MessageAttachmentFile attachment={attachment} />;
  } else if (attachment.type === "image") {
    return <MessageAttachmentImage attachment={attachment} />;
  } else if (attachment.type === "unsupported") {
    return <MessageAttachmentUnsupported attachment={attachment} />;
  } else if (attachment.type === "link") {
    return <MessageAttachmentLink attachment={attachment} />;
  }

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        width: 100%;
      `}
    >
      <Spin
        indicator={
          <LoadingOutlined
            className={css`
              font-size: 24px;
            `}
            spin
          />
        }
      />
    </div>
  );
});
