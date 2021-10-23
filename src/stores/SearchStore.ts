import { Api } from "@/api";
import { action, makeAutoObservable } from "mobx";
import {
  TSearchByMessageRequest,
  TSearchBySourceAccountRequest,
} from "@/api/types";
import { debounce } from "lodash-es";
import { ItemsQuery, TItemsQueryResponse } from "./model/ItemsQuery";
import { Conversation } from "@/entities";
import { ChannelsStore } from "./ChannelsStore";
import { SchoolsStore } from "./SchoolsStore";
import { TagsStore } from "./TagsStore";
import { singleton } from "tsyringe";

@singleton()
export class SearchStore {
  isLoaded = true;
  searchQuery = "";
  searchByMessageQuery;
  searchBySourceAccountQuery;

  constructor(
    private api: Api,
    private tags: TagsStore,
    private schools: SchoolsStore,
    private channels: ChannelsStore
  ) {
    this.searchByMessageQuery = new ItemsQuery<
      Conversation,
      TSearchByMessageRequest,
      TItemsQueryResponse<Conversation>
    >(this.api.search.byMessage);

    this.searchBySourceAccountQuery = new ItemsQuery<
      Conversation,
      TSearchBySourceAccountRequest,
      TItemsQueryResponse<Conversation>
    >(this.api.search.bySourceAccount);

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
            sources: this.channels.activeChannels.map(({ id }) => id),
            schoolIds: this.schools.activeSchoolsIds,
            tags: this.tags.activeTags.map(({ name }) => name),
            noTags: this.tags.noTags,
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
