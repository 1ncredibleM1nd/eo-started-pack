import { observer } from "mobx-react-lite";
import {
  LoadingOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import * as fileApi from "@/ApiResolvers/file";
import { Spin } from "antd";
import { useState } from "react";
import { Attachment } from "@/entities";

type TProps = { attachment: Attachment };

export const MessageAttachmentFile = observer(({ attachment }: TProps) => {
  const [downloading, setDownload] = useState(false);

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
});
