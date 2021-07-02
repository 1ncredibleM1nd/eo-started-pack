import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { MessageAttachmentImage } from "@/components/chat/comp/MessageAttachmentImage";
import { MessageAttachmentFile } from "./MessageAttachmentFile";
import type { TMessageAttachment } from "@/types/message";

type TProps = { attachment: TMessageAttachment };

export function MessageAttachment({ attachment }: TProps) {
  if (attachment.type === "file") {
    return <MessageAttachmentFile attachment={attachment} />;
  } else if (attachment.type === "image") {
    return <MessageAttachmentImage attachment={attachment} />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
}
