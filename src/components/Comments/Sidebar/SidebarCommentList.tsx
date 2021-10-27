import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Comment } from "../Comment";
import { CommentsStore } from "@/stores/comments-store/comments-store";
import { SidebarAddCommentButton } from "@/components/Comments/Sidebar/SidebarAddCommentButton";
import { SidebarAddCommentForm } from "@/components/Comments/Sidebar/SidebarAddCommentForm";
import { ContactListLoader } from "@/components/contacts/ContactListLoader/ContactListLoader";
import { SidebarCommentListContainer } from "./SidebarCommentListContainer";

type TProps = {
  conversationId?: number;
};

export const SidebarCommentList = observer(({ conversationId }: TProps) => {
  if (!conversationId) {
    return null;
  }

  const [visibleForm, setVisibleForm] = useState(false);
  const [commentsStore] = useState(() => new CommentsStore());

  const onCreateComment = (content: string) => {
    setVisibleForm(false);
    commentsStore.createComment.fetch({ conversationId, content });
  };

  const onDeleteComment = (id: number) => {
    commentsStore.deleteComment.fetch({ id });
  };

  const onCancel = () => setVisibleForm(false);

  useEffect(() => {
    commentsStore.comments.fetch({ conversationId });

    return () => {
      commentsStore.destroy();
    };
  }, [conversationId]);

  return (
    <SidebarCommentListContainer>
      {visibleForm ? (
        <SidebarAddCommentForm onCreate={onCreateComment} onCancel={onCancel} />
      ) : (
        <SidebarAddCommentButton
          type={"link"}
          onClick={() => setVisibleForm(!visibleForm)}
        >
          Добавить комментарий
        </SidebarAddCommentButton>
      )}

      {commentsStore.comments.isPending && <ContactListLoader />}
      {commentsStore.sortedComments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={onDeleteComment}
        />
      ))}
    </SidebarCommentListContainer>
  );
});
