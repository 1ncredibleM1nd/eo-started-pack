import { observer } from "mobx-react-lite";
import { Image, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TMessageAttachment } from "@/types/message";
import { css } from "goober";

type TProps = { attachment: TMessageAttachment };

export const MessageAttachmentImage = observer(({ attachment }: TProps) => {
  return (
    <Image
      className={css`
        width: 500px;
        height: 375px;
        margin: -8px -16px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

        @media (max-width: 768px) {
          width: 200px;
          height: 150px;
        }
      `}
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
