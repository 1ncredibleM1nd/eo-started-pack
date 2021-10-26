import { makeAutoObservable } from "mobx";
import { TRequest, TResponse } from "@/api/request-builder";

const enum STATE {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export class Query<I, O> {
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

  get isIdle() {
    return this.state === STATE.IDLE;
  }

  get isPending() {
    return this.state === STATE.PENDING;
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

    await this.method(this._request).then(
      this.handleQueryFulfilled,
      this.handleQueryRejected
    );
  }

  reset = () => {
    this._request = undefined;
    this._state = STATE.IDLE;
    this._data = undefined;
    this.setError(undefined);
  };

  handleQueryFulfilled = ({ data }: TResponse<O>) => {
    this._state = STATE.FULFILLED;
    this._data = data;
    this.setError(undefined);
  };

  handleQueryRejected = (error: Error) => {
    this._state = STATE.REJECTED;
    this.setError(error);
  };
}
