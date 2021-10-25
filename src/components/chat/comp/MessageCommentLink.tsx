import { observer } from "mobx-react-lite";
import { Entity, TEntityType } from "@/stores/model";

type IProps = {
  type: TEntityType;
  link: string;
};

export const MessageCommentLink = observer((props: IProps) => {
  const { type, link } = props;
  const title = Entity.stringifyType(type);
  return link ? (
    <a href={link} target="_blank" rel="noreferrer" className="message-link">
      {title}
    </a>
  ) : (
    <>{title}</>
  );
});
