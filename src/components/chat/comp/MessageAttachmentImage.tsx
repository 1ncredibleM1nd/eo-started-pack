import { observer } from "mobx-react-lite";
import { Image, Spin } from "antd";
import { TMessageAttachment } from "@/types/message";
import { LoadingOutlined } from "@ant-design/icons";
import "./MessageAttachmentImage.scss";

type TProps = { attachment: TMessageAttachment; reply: boolean };

export const MessageAttachmentImage = observer(
  ({ attachment, reply }: TProps) => {
    return (
      <Image
        className={`message-attachment-image ${
          reply ? "message-attachment-image--reply" : ""
        }`}
        src={attachment.data.preview}
        preview={{ src: attachment.url, mask: false }}
        placeholder={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Spin
              spinning={true}
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          </div>
        }
        style={{ objectFit: "cover", cursor: "pointer" }}
      />
    );
  }
);
