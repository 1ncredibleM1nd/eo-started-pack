import { observer } from "mobx-react-lite";
import { LoadingOutlined } from "@ant-design/icons";
import { Attachment } from "@/entities";

type TProps = { attachment: Attachment };

export const MessageAttachmentUnsupported = observer(
  ({ attachment }: TProps) => {
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
            <span className={"file-title"}>{attachment.title}</span>
            <span />
          </div>
        </div>
      </div>
    );
  }
);
