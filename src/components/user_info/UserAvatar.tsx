import React, { useState } from "react";
import Avatar from "react-avatar";
import "./UserAvatar.scss";
import { Image } from "antd";

type TProps = {
  name?: string;
  user?: any;
  size?: string;
  round?: boolean;
  textSizeRatio?: number;
};

export function getInitials(name: string) {
  let initials = name
    .replace(/([A-ZА-Я])/g, " $1")
    .replace(/\p{Emoji}/gu, "")
    .trim();

  if (!initials.length) {
    initials = "NAN";
  }

  return initials.toLowerCase();
}

export const UserAvatar = (props: TProps) => {
  const { size, user, round, textSizeRatio } = props;
  const randomColors = ["#6FBB85", "#70ACDD", "#EF8079", "#EF79B2", "#D185FF"];

  const [fallback, setFallback] = useState(false);

  let initials = getInitials(user.username ?? "");
  let maxInitials = 2;

  if (user.avatar && !fallback) {
    return (
      <Image
        className="image-avatar"
        src={user.avatar}
        height={size}
        alt=""
        preview={false}
        onError={() => setFallback(true)}
      />
    );
  }

  return (
    <Avatar
      size={size}
      name={initials}
      maxInitials={maxInitials}
      round={round}
      textSizeRatio={textSizeRatio}
      // @ts-ignore
      color={Avatar.getRandomColor(initials, randomColors)}
    />
  );
};
