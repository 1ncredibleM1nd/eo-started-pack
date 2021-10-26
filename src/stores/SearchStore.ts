import { action, makeAutoObservable } from "mobx";
import {
  TSearchByMessageRequest,
  TSearchBySourceAccountRequest,
} from "@/api/types";
import { debounce } from "lodash-es";
import { Conversation, ItemsQuery } from "@/stores/model";
import { TItemsData } from "@/api/request-builder";
import { RootStoreInstance } from ".";
import { Api } from "@/api";

export class SearchStore {
  isLoaded = true;
  searchQuery = "";
  searchByMessageQuery;
  searchBySourceAccountQuery;

  constructor(private readonly rootStore: RootStoreInstance) {
    this.searchByMessageQuery = new ItemsQuery<
      Conversation,
      TSearchByMessageRequest,
      TItemsData<Conversation>
    >(Api.search.byMessage);

    this.searchBySourceAccountQuery = new ItemsQuery<
      Conversation,
      TSearchBySourceAccountRequest,
      TItemsData<Conversation>
    >(Api.search.bySourceAccount);

    makeAutoObservable(this);
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

  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.fetch();
  }

  reset() {
    this.searchQuery = "";
    this.searchByMessageQuery.reset();
    this.searchBySourceAccountQuery.reset();
  }

  fetch = debounce(
    action("fetch", async () => {
      if (this.isEmpty) {
        this.reset();
      } else {
        this.isLoaded = false;

        const request = {
          filter: {
            sources: this.rootStore.channelsStore.activeChannels.map(
              ({ id }) => id
            ),
            schoolIds: this.rootStore.schoolsStore.activeSchoolsIds,
            tags: this.rootStore.tagsStore.activeTags.map(({ name }) => name),
            noTags: this.rootStore.tagsStore.noTags,
          },
          search: {
            query: this.searchQuery,
          },
          page: 1,
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
