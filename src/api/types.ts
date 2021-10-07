export type TSearchByMessageRequest = {
  search: {
    query: string;
  };
  filter: {
    sources: string[];
    schoolIds: number[];
    conversationId?: number;
    tags: string[];
    noTags: boolean;
  };
  page?: number;
};

export type TSearchBySourceAccountRequest = {
  search: {
    query: string;
  };
  filter: {
    sources: string[];
    schoolIds: number[];
    conversationId?: number;
    tags: string[];
    noTags: boolean;
  };
  page?: number;
};
