import React from "react";
import Avatar from "react-avatar";
import "./UserAvatar.scss";

type TProps = {
  name?: string;
  user?: any;
  size?: string;
  round?: boolean;
  textSizeRatio?: number;
};

export function getInitials(name: string) {
  let initials = name.replace(/([A-ZА-Я])/g, " $1").trim();

  if (!initials.length) {
    initials = "NAN";
  }
  return initials.toLowerCase();
}

export const UserAvatar = (props: TProps) => {
  const { size, user, round, textSizeRatio } = props;
  const randomColors = ["#6FBB85", "#70ACDD", "#EF8079", "#EF79B2", "#D185FF"];

  let initials = getInitials(user.username ?? "");

  if (user.avatar) {
    return (
      <img className="image-avatar" src={user.avatar} height={size} alt="" />
    );
  }

  return (
    <Avatar
      size={size}
      name={user.avatar ? null : initials}
      src={user.avatar ? user.avatar : ""}
      round={round}
      textSizeRatio={textSizeRatio}
      // @ts-ignore
      color={Avatar.getRandomColor(initials, randomColors)}
    />
  );
};
