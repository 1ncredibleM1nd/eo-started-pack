import { makeAutoObservable } from "mobx";
import { Api } from "@/api";
import { socket } from "@/api/socket";
import { ItemsQuery, Query } from "@/stores/model";
import { Comment } from "@/stores/model/Comment";
import { TItemsData } from "@/api/request-builder";
import { TComment } from "@/api/modules/comment";

export class CommentsStore {
  comments = new ItemsQuery<
    Comment,
    { conversationId: number },
    TItemsData<Comment>
  >(Api.comment.getAll);

  createComment = new Query<
    { conversationId: number; content: string },
    { id: number }
  >(Api.comment.create);

  deleteComment = new Query<{ id: number }, boolean>(Api.comment.delete);

  get sortedComments() {
    return this.comments.items;
  }

  constructor() {
    makeAutoObservable(this);

    this.listenSocket();
  }

  listenSocket() {
    socket.on("conversationCommentAdded", this.onConversationCommentAdded);
    socket.on("conversationCommentRemoved", this.onConversationCommentRemoved);
  }

  destroy() {
    this.comments.reset();
    socket.off("conversationCommentAdded", this.onConversationCommentAdded);
    socket.off("conversationCommentRemoved", this.onConversationCommentRemoved);
  }

  onConversationCommentAdded = (data: TComment) => {
    this.comments.addItem(new Comment(data));
  };

  onConversationCommentRemoved = ({ id }: { id: number; schoolId: number }) => {
    this.comments.removeItem(id);
  };
}
