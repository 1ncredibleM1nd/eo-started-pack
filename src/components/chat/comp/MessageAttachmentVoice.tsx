import React, { useCallback, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import { Icon } from "@iconify/react";
import playCircle from "@iconify/icons-mdi/play-circle";
import pauseCircle from "@iconify/icons-mdi/pause-circle";
import dayjs from "@/services/dayjs";
import "../VoicePlayer.scss";
import { Attachment } from "@/entities";

type TProps = { attachment: Attachment };

export const MessageAttachmentVoice = observer(({ attachment }: TProps) => {
  const id = "waveform-" + new Date().getTime();
  const wavesurferRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [playPosition, setPlayPosition] = useState(0);

  const togglePlay = useCallback(() => {
    wavesurferRef.current?.playPause();
  }, []);

  const handleWSMount = useCallback((waveSurfer) => {
    wavesurferRef.current = waveSurfer;

    if (wavesurferRef.current) {
      wavesurferRef.current.load(attachment.url);

      wavesurferRef.current.on("ready", () => {
        setPlayPosition(0);
      });

      wavesurferRef.current.on("seek", () => {
        setPlayPosition(wavesurferRef.current.getCurrentTime());
      });

      wavesurferRef.current.on("audioprocess", () => {
        setPlayPosition(wavesurferRef.current.getCurrentTime());
      });

      wavesurferRef.current.on("play", () => {
        setPlaying(true);
      });

      wavesurferRef.current.on("pause", () => {
        setPlaying(false);
      });

      wavesurferRef.current.on("finish", () => {
        setPlaying(false);
      });

      if (window) {
        window.surferidze = wavesurferRef.current;
      }
    }
  }, []);

  return (
    <div className="voice-message">
      <button
        onClick={togglePlay}
        className="button-clear main-controls-button play-pause-button"
        type="button"
      >
        <Icon icon={playing ? pauseCircle : playCircle} />
      </button>
      <WaveSurfer onMount={handleWSMount}>
        <WaveForm
          id={id}
          container={id}
          waveColor="#BDBABD"
          progressColor="#749FD7"
          height="35"
          barWidth="1"
          barHeight="5"
          cursorWidth="0"
        ></WaveForm>
      </WaveSurfer>
      <div className="voice-time">
        {dayjs(playPosition * 1000).format("mm:ss")}
      </div>
    </div>
  );
});
