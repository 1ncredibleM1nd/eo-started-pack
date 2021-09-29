import { SearchAPI } from "@/api";
import { action, makeAutoObservable } from "mobx";
import { RootStoreInstance } from ".";
import {
  TSearchByMessageRequest,
  TSerachBySourceAccountRequest,
} from "@/api/types";
import { debounce } from "lodash";
import { ItemsQuery, TItemsQueryResponse } from "./model/ItemsQuery";
import { Conversation } from "@/entities";

export class SearchStore {
  constructor(private readonly rootStore: RootStoreInstance) {
    makeAutoObservable(this);
  }

  isLoaded = true;

  searchByMessageQuery = new ItemsQuery<
    Conversation,
    TSearchByMessageRequest,
    TItemsQueryResponse<Conversation>
  >(SearchAPI.byMessage);

  searchBySourceAccountQuery = new ItemsQuery<
    Conversation,
    TSerachBySourceAccountRequest,
    TItemsQueryResponse<Conversation>
  >(SearchAPI.bySourceAccount);

  searchQuery: string = "";
  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.fetch();
  }

  get isEmpty() {
    return this.searchQuery === "";
  }

  get running() {
    return (
      !this.searchByMessageQuery.isIdle ||
      !this.searchBySourceAccountQuery.isIdle
    );
  }

  reset() {
    this.searchQuery = "";
    this.searchByMessageQuery.reset();
    this.searchBySourceAccountQuery.reset();
  }

  fetch = debounce(
    action("fetch", async () => {
      if (this.searchQuery === "") {
        this.reset();
      } else {
        this.isLoaded = false;

        const request = {
          search: {
            query: this.searchQuery,
            sources: this.rootStore.channelsStore.activeChannels.map(
              ({ id }) => id
            ),
            tags: this.rootStore.tagsStore.activeTags.map(({ id }) => id),
            noTags: this.rootStore.tagsStore.noTags,
          },
          page: 1,
          schoolIds: this.rootStore.schoolsStore.activeSchoolsIds,
        };

        await Promise.all([
          this.searchBySourceAccountQuery.fetch(request),
          this.searchByMessageQuery.fetch(request),
        ]);

        this.isLoaded = true;
      }
    }),
    250
  );
}
