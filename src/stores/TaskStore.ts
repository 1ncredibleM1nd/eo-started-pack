import { makeAutoObservable } from "mobx";
import { Task } from "@/stores/model";
import { RootStoreInstance } from "./index";
import { getConversationTasks } from "@/api/deprecated";
import { socket } from "@/api/socket";
import { reverse, sortBy } from "lodash-es";
import { TTask } from "@/api/types";

type TConversationTaskStatus = "" | "today" | "expired" | "later";

export class TaskStore {
  tasks = new Map<number, Task>();
  taskStatus: TConversationTaskStatus = "";

  constructor(private readonly rootStore: RootStoreInstance) {
    makeAutoObservable(this);

    socket.on("conversationTaskAdded", (data) => {
      this.addTasks([data]);
    });

    socket.on("conversationTaskRemoved", (data) => {
      this.removeTask(data.id);
    });

    socket.on("conversationTaskEdited", (data) => {
      this.editTask(data);
    });
  }

  isLoaded = false;
  setLoaded(state: boolean) {
    this.isLoaded = state;
  }

  pageLoading = false;
  setPageLoading(value: boolean) {
    this.pageLoading = value;
  }

  hasNext = true;
  setHasNext(value: boolean) {
    this.hasNext = value;
  }

  hasPrev = true;
  setHasPrev(value: boolean) {
    this.hasPrev = value;
  }

  prevPage: number = 1;
  setPrevPage(page: number) {
    this.prevPage = page;
  }

  nextPage: number = 1;
  setNextPage(page: number) {
    this.nextPage = page;
  }

  get sortedTasks() {
    return reverse(
      sortBy(Array.from(this.tasks.values()), "timestampDateToComplete")
    );
  }

  async loadPrev() {
    if (this.pageLoading || !this.hasPrev || this.prevPage === 1) {
      return;
    }

    this.setPageLoading(true);

    const { items: tasks, page } = await getConversationTasks({
      schoolIds: this.rootStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage - 1,
      taskStatus: this.taskStatus,
    });

    this.addTasks(tasks);
    this.setPrevPage(page);

    this.setHasPrev(page !== 1);
    this.setPageLoading(false);
  }

  async loadNext() {
    if (this.pageLoading || !this.hasNext) {
      return;
    }

    this.setPageLoading(true);

    const { items: tasks, page } = await getConversationTasks({
      schoolIds: this.rootStore.schoolsStore.activeSchoolsIds,
      page: this.nextPage + 1,
      taskStatus: this.taskStatus,
    });

    this.addTasks(tasks);
    this.setNextPage(page);
    this.setHasNext(tasks.length >= 20);
    this.setPageLoading(false);
  }

  addTasks(tasks: TTask[]) {
    for (let task of tasks) {
      if (!this.tasks.has(task.id)) {
        this.tasks.set(task.id, new Task(task));
      }
    }
  }

  getTask(id: number) {
    if (this.tasks.has(id)) {
      return this.tasks.get(id);
    }

    return undefined;
  }

  hasTaskt(id: number) {
    return this.tasks.has(id);
  }

  removeTask(id: number) {
    this.tasks.delete(id);
  }

  editTask(data: any) {
    const task = this.tasks.get(data.id);
    task?.setStatus(data.status);
  }

  async refetch() {
    this.tasks.clear();
    this.setNextPage(1);
    this.setHasNext(true);
    this.setPrevPage(1);
    this.setHasPrev(false);
    this.setLoaded(false);
    await this.fetch();
  }

  async fetch() {
    const { items: tasks, page } = await getConversationTasks({
      schoolIds: this.rootStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage,
      taskStatus: this.taskStatus,
    });

    this.setPrevPage(page);
    this.setHasPrev(page !== 1);
    if (this.nextPage === 1 && this.nextPage !== page) {
      this.setNextPage(page);
      this.setHasNext(tasks.length >= 20);
    }

    this.tasks.clear();
    if (tasks.length > 0) {
      this.addTasks(tasks);
    }

    this.setLoaded(true);
  }

  async setTaskStatus(status: TConversationTaskStatus) {
    this.taskStatus = status;
    return await this.refetch();
  }
}
