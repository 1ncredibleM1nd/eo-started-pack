import React from "react";
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

  return null;
}
