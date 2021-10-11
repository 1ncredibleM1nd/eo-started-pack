import { Conversation } from "@/entities";
import { TItemsQueryResponse } from "@/stores/model/ItemsQuery";
import { User } from "@/stores/model/User";
import { RequestBuilder } from "../request-builder";
import type {
  TSearchByMessageRequest,
  TSearchBySourceAccountRequest,
} from "../types";

const transformConversations = (output: TItemsQueryResponse<Conversation>) => {
  if (!output.items?.length) {
    return output;
  }

  return {
    ...output,
    items: output.items.map(
      (conversation) =>
        new Conversation({
          id: conversation.id,
          sourceAccountId: conversation.conversation_source_account_id,
          lastMessage: conversation.last_message,
          user: new User(
            conversation.user[0],
            conversation.name,
            conversation.avatar
          ),
          tags: conversation.tags,
          schoolId: conversation.school_id,
          sendFile: conversation.send_file,
          linkSocialPage: conversation.link_social_page,
          dialogStatus: conversation.dialog_status,
          restrictions: conversation.restrictions,
        })
    ),
  };
};

export default class Search {
  static bySourceAccount = new RequestBuilder<
    TSearchBySourceAccountRequest,
    TItemsQueryResponse<Conversation>
  >()
    .withPath("/conversation/search-by-sourceaccount")
    .withOutputTransformer(transformConversations)
    .build();

  static byMessage = new RequestBuilder<
    TSearchByMessageRequest,
    TItemsQueryResponse<Conversation>
  >()
    .withPath("/conversation/search-by-message")
    .withOutputTransformer(transformConversations)
    .build();
}
