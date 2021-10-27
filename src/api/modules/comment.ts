import {
  FALLBACK_DATA_ITEMS,
  RequestBuilder,
  TItemsData,
} from "@/api/request-builder";
import { Comment } from "@/stores/model/Comment";

export type TCommentStatus = "active" | "deleted";

export type TComment = {
  id: number;
  schoolId: number;
  conversationId: number;
  content: string;
  status: TCommentStatus;
  creatorId: number;
  createdAt: number;
};

export class CommentApi {
  create = new RequestBuilder<
    { conversationId: number; content: string },
    { id: number }
  >()
    .withPath("/conversation/create-comment")
    .withDataOnError({ id: -1 })
    .build();

  delete = new RequestBuilder<{ id: number }, boolean>()
    .withPath("/conversation/delete-comment")
    .withDataOnError(false)
    .build();

  getAll = new RequestBuilder<{ conversationId: number }, TItemsData<Comment>>()
    .withPath("/conversation/get-comments")
    .withOutputTransformer<TItemsData<TComment>>(({ data }) => {
      return {
        ...data,
        items: data.items.map((item) => new Comment(item)),
      };
    })
    .withDataOnError(FALLBACK_DATA_ITEMS)
    .build();
}
