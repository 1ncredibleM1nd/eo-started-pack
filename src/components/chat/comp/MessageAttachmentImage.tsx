import React from "react";
import { observer } from "mobx-react";
import { Image } from "antd";
import { TMessageAttachment } from "@/types/message";

type TProps = { attachment: TMessageAttachment };

export const MessageAttachmentImage = observer(({ attachment }: TProps) => {
  return <Image src={attachment.data.preview} width={200} preview={{ src: attachment.url }} />;
});
