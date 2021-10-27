import { observer } from "mobx-react-lite";
import dayjs from "dayjs";
import { css } from "goober";
import { useStore } from "@/stores";
import { Comment as CommentModel } from "@/stores/model/Comment";
import { CommentContainer } from "./CommentContainer";
import { CommentContent } from "./CommentContent";
import { CommentFrom } from "./CommentFrom";
import { CommentDate } from "./CommentDate";
import { Icon } from "@/ui/Icon/Icon";
import { Popconfirm } from "antd";

type TProps = {
  comment: CommentModel;
  onDelete?: (id: number) => void;
};

export const Comment = observer(({ comment, onDelete }: TProps) => {
  const { managersStore } = useStore();
  const manager = managersStore.getById(comment.creatorId);
  const createdDate = dayjs(comment.createdAt * 1000).format(
    "DD.MM.YYYY HH:mm"
  );

  return (
    <CommentContainer>
      <CommentContent>{comment.content}</CommentContent>
      <CommentFrom from={manager} />
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <CommentDate>{createdDate}</CommentDate>
        <Popconfirm
          title={"Вы точно хотите удалить комментарий ?"}
          onConfirm={() => onDelete?.(comment.id)}
          okText={"Да"}
          cancelText={"Нет"}
        >
          <Icon
            name={"icon_delete_task"}
            size={"xs"}
            className={css`
              cursor: pointer;
            `}
          />
        </Popconfirm>
      </div>
    </CommentContainer>
  );
});
