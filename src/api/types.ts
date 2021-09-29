export type TSearchByMessageRequest = {
  search: {
    query: string;
    sources: string[];
    tags: string[];
    noTags: boolean;
    conversationId?: number;
  };
  page?: number;
  schoolIds: number[];
};

export type TSearchBySourceAccountRequest = {
  search: {
    query: string;
    sources: string[];
    tags: string[];
    noTags: boolean;
    conversationId?: number;
  };
  page?: number;
  schoolIds: number[];
};
