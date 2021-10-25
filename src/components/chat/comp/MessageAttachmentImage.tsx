import { observer } from "mobx-react-lite";
import { Image, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./MessageAttachmentImage.scss";
import { Attachment } from "@/stores/model";

type TProps = {
  attachment: Attachment;
  reply?: boolean;
  onImagePreview: (state: boolean) => void;
};

export const MessageAttachmentImage = observer(
  ({ attachment, reply, onImagePreview }: TProps) => {
    return (
      <Image
        className={`message-attachment-image ${
          reply ? "message-attachment-image--reply" : ""
        }`}
        src={attachment.data.preview}
        preview={{
          src: attachment.url,
          mask: false,
          onVisibleChange: (visible) => onImagePreview(visible),
        }}
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
