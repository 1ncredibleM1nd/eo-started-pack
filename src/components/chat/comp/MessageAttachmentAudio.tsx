import React from "react";
import { observer } from "mobx-react-lite";
import { TMessageAttachment } from "@/types/message";
import AudioPlayer from "react-h5-audio-player";
import "../AudioPlayer.scss";

type TProps = { attachment: TMessageAttachment };

export const MessageAttachmentAudio = observer(({ attachment }: TProps) => {
  return (
    <AudioPlayer
      src={attachment.url}
      className={"audio-message"}
      showSkipControls={false}
      showJumpControls={false}
      showDownloadProgress={false}
      customAdditionalControls={[]}
      customVolumeControls={[]}
      header={attachment.title}
      customControlsSection={["MAIN_CONTROLS"]}
      customProgressBarSection={["PROGRESS_BAR", "CURRENT_TIME"]}
    />
  );
});
