import { useState } from "react";
import Avatar from "react-avatar";
import "./AvatarThumb.scss";
import { Image } from "antd";
import { classnames } from "@/utils/styles";
import { css } from "goober";

type TProps = {
  name?: string;
  textLength?: number;
  img?: any;
  size?: number;
  round?: boolean;
  textSizeRatio?: number;
  className?: string;
};

function getInitials(name: string) {
  let initials = name
    .replace(/([A-ZА-Я])/g, " $1")
    .replace(/\p{Emoji}/gu, "")
    .trim();

  if (!initials.length) {
    initials = "NAN";
  }

  return initials.toLowerCase();
}

export const AvatarThumb = (props: TProps) => {
  const { name, textLength, img, size, round, textSizeRatio, className } =
    props;
  const randomColors = ["#6FBB85", "#70ACDD", "#EF8079", "#EF79B2", "#D185FF"];

  const [fallback, setFallback] = useState(false);

  let initials = getInitials(name ?? "");
  let maxInitials = textLength;

  if (img && !fallback) {
    return (
      <div
        className={classnames(
          className,
          css`
            width: ${size}px;
            height: ${size}px;
            display: flex;
            align-items: center;
            justify-content: center;
          `
        )}
      >
        <Image
          className={classnames(
            css`
              border-radius: ${round ? "50%" : "0"};
            `
          )}
          src={img}
          height={size}
          width={size}
          alt=""
          preview={false}
          onError={() => setFallback(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={classnames(
        className,
        css`
          width: ${size + "px"};
          height: ${size + "px"};
          display: flex;
          align-items: center;
          justify-content: center;
        `
      )}
    >
      <Avatar
        size={size}
        name={initials}
        maxInitials={maxInitials}
        round={round}
        textSizeRatio={textSizeRatio}
        // @ts-ignore
        color={Avatar.getRandomColor(initials, randomColors)}
      />
    </div>
  );
};
