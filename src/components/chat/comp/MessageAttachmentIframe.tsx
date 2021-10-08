import { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { css } from "goober";
import { Attachment } from "@/entities";

type TProps = { attachment: Attachment };

export const MessageAttachmentIframe = observer(({ attachment }: TProps) => {
  const [loading, setLoading] = useState(true);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="video-message">
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <img
          src={attachment.data?.preview ?? null}
          width={300}
          height={170}
          alt=""
          className={css`
            display: ${loading ? "block" : "none"};
          `}
        />
        <iframe
          className={css`
            display: ${loading ? "none" : "block"};
            border: 0;
            width: 100%;
          `}
          allowFullScreen={true}
          frameBorder={0}
          title="video"
          src={attachment.url}
          width={300}
          height={170}
          onLoad={onLoad}
        />
      </Spin>
    </div>
  );
});
