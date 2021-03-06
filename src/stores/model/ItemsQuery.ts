import { TItemsData, TRequest } from "@/api/request-builder";
import { makeAutoObservable } from "mobx";

const enum STATE {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

const PAGE_ITEMS_COUNT = 20;

export class ItemsQuery<T, I, O extends TItemsData<T>> {
  constructor(private readonly method: TRequest<I, O>) {
    makeAutoObservable(this);
  }

  private _request?: I;

  get request() {
    return this._request;
  }

  private _state = STATE.IDLE;

  get state() {
    return this._state;
  }

  private _data?: O;

  get data() {
    return this._data;
  }

  get items() {
    return this._data?.items ?? [];
  }

  get page() {
    return this._data?.page ?? 1;
  }

  get count() {
    return this._data?.count ?? 0;
  }

  get isIdle() {
    return this.state === STATE.IDLE;
  }

  get isPending() {
    return this.state === STATE.PENDING;
  }

  get isEmpty() {
    return this.items.size <= 0;
  }

  private _hasNext = true;
  get hasNext() {
    return this.count > 0 && this._hasNext;
  }

  private _error?: Error;
  get error() {
    return this._error;
  }

  private setError = (error?: Error) => {
    this._error = error;

    if (error === undefined) {
      return;
    }
  };

  async fetch(request: I) {
    this._request = request;
    this._state = STATE.PENDING;
    this.setError(undefined);

    await this.method({ ...this._request, page: this.page }).then(
      ({ data }) => {
        this._state = STATE.FULFILLED;
        this._data = data;
        this._hasNext = data.items?.length >= PAGE_ITEMS_COUNT;
        this.setError(undefined);
      },
      (error: Error) => {
        this._state = STATE.REJECTED;
        this.setError(error);
      }
    );
  }

  getItem(id: number) {
    return this._data?.items.find((item) => id === item.id);
  }

  hasItem(id: number) {
    return this._data?.items.some((item) => id === item.id);
  }

  removeItem(id: number) {
    const removeIndex =
      this._data?.items.findIndex((item) => id === item.id) ?? -1;
    if (removeIndex > -1) {
      this._data?.items.splice(removeIndex, 1);
    }
  }

  addItem(item: T) {
    this._data?.items.push(item);
  }

  async loadNext() {
    if (!this._request) {
      return;
    }

    this._state = STATE.PENDING;
    this.setError(undefined);

    await this.method({ ...this._request, page: this.page + 1 }).then(
      ({ data }) => {
        this._state = STATE.FULFILLED;
        this._data = {
          ...data,
          items: [...this.items, ...data.items],
        };

        this._hasNext = data.items?.length >= PAGE_ITEMS_COUNT;
        this.setError(undefined);
      },
      (error: Error) => {
        this._state = STATE.REJECTED;
        this.setError(error);
      }
    );
  }

  reset = () => {
    this._request = undefined;
    this._state = STATE.IDLE;
    this._data = undefined;
    this._hasNext = true;
    this.setError(undefined);
  };
}
