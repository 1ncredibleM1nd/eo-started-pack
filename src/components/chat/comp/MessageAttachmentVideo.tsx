import React from "react";
import { observer } from "mobx-react-lite";
import { TMessageAttachment } from "@/types/message";
import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  VolumeMenuButton,
  PlayToggle,
  FullscreenToggle,
  ProgressControl,
} from "video-react";
import "video-react/dist/video-react.css";

type TProps = { attachment: TMessageAttachment };

export const MessageAttachmentVideo = observer(({ attachment }: TProps) => {
  return (
    <div className="video-message">
      <Player src={attachment.url} poster={attachment.data?.preview ?? null}>
        <BigPlayButton position="center" />
        <ControlBar autoHide={true} disableDefaultControls>
          <PlayToggle order={1} />
          <FullscreenToggle order={8} />
          <ProgressControl order={5} />
          <VolumeMenuButton vertical order={6} />
        </ControlBar>
        <LoadingSpinner />
      </Player>
    </div>
  );
});
