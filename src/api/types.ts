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

export type TTask = {
  id: number;
  name?: string;
  school_id: number;
  conversation_id: number;
  content: string;
  creator_id: number;
  status: string;
  created_at: number;
  timestamp_date_to_complete: number;
  social_media: string;
};
