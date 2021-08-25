import { observer } from "mobx-react-lite";
import { Image, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TMessageAttachment } from "@/types/message";

type TProps = { attachment: TMessageAttachment };

export const MessageAttachmentImage = observer(({ attachment }: TProps) => {
  return (
    <Image
      width={200}
      height={150}
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
});
