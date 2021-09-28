import { Conversation } from "@/entities";

export type TSearchByMessageRequest = {
  search: {
    query: string;
    sources: string[];
    tags: number[];
    noTags: boolean;
    conversationId?: number;
  };
  page?: number;
  schoolIds: number[];
};

export type TSerachBySourceAccountRequest = {
  search: {
    query: string;
    sources: string[];
    tags: number[];
    noTags: boolean;
    conversationId?: number;
  };
  page?: number;
  schoolIds: number[];
};
