import { observer } from "mobx-react-lite";
import { LoadingOutlined } from "@ant-design/icons";
import type { TMessageAttachment } from "@/types/message";

type TProps = { attachment: TMessageAttachment };

export const MessageAttachmentLink = observer(({ attachment }: TProps) => {
  return (
    <div>
      <div className="msg-content-file">
        <div className="document-preview">
          {attachment.data ? (
            <img src={attachment.data.preview} alt="" />
          ) : (
            <LoadingOutlined />
          )}
        </div>
        <div className="file-title-container">
          <a
            href={attachment.url}
            target={"_blank"}
            className={"file-title"}
            rel="noreferrer"
          >
            {attachment.title}
          </a>
          <span />
        </div>
      </div>
    </div>
  );
});
