import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { TypesMessage } from "@/stores/classes";

type IProps = {
  type: string;
  link: string;
};

export const MessageCommentLink = observer((props: IProps) => {
  const { type, link } = props;
  const title = TypesMessage.getTypeDescription(type);
  return link ? (
    <a href={link} target="_blank" rel="noreferrer" className="message-link">
      {title}
    </a>
  ) : (
    <>{title}</>
  );
});
