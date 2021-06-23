import React, { useState } from "react";
import { TMessageAttachment } from "types/message";
import { Spin } from "antd";
import {
  LoadingOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import * as fileApi from "../../../ApiResolvers/file";

type TProps = { attachment: TMessageAttachment };

export function MessageAttachment({ attachment }: TProps) {
  const [downloading, setDownload] = useState(false);

  if (attachment.type !== "file") {
    return null;
  }

  return (
    <Spin
      spinning={downloading}
      delay={300}
      indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
    >
      <div
        onClick={async () => {
          setDownload(true);
          await fileApi.download(attachment.url, attachment.title);
          setDownload(false);
        }}
      >
        <div className="msg-content-file">
          <div className="document-preview">
            {attachment.data ? (
              <img src={attachment.data.preview} alt="" />
            ) : (
              <LoadingOutlined />
            )}
          </div>
          <div className="file-title-container">
            <span className={"file-title"}>{attachment.title}</span>
            <VerticalAlignBottomOutlined />
          </div>
        </div>
      </div>
    </Spin>
  );
}
