import { makeAutoObservable } from "mobx";
import { ConversationTask, TConversationTaskStatus } from "@/stores/model";
import { rootStore } from "./index";
import { getConversationTasks } from "@/api/deprecated";

export class TaskStore {
  tasks: Map<number, ConversationTask> = new Map();
  taskStatus: TConversationTaskStatus = "";

  constructor() {
    makeAutoObservable(this);
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
    return Array.from(this.tasks.values());
  }

  async loadPrev() {
    if (this.pageLoading || !this.hasPrev || this.prevPage === 1) {
      return;
    }

    this.setPageLoading(true);

    const { items: tasks, page } = await getConversationTasks({
      schoolIds: rootStore.schoolsStore.activeSchoolsIds,
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
      schoolIds: rootStore.schoolsStore.activeSchoolsIds,
      page: this.nextPage + 1,
      taskStatus: this.taskStatus,
    });

    this.addTasks(tasks);
    this.setNextPage(page);
    this.setHasNext(tasks.length >= 20);
    this.setPageLoading(false);
  }

  addTasks(tasks: any[]) {
    for (let task of tasks) {
      if (!this.tasks.has(task.id)) {
        this.tasks.set(
          task.id,
          new ConversationTask({
            id: task.id,
            content: task.content,
            creatorId: task.creatorId,
            timestampDateToComplete: task.timestampDateToComplete,
            taskStatus: "",
            status: task.status,
            conversationId: task.conversationId,
            name: task.name,
            avatar: task.avatar,
            socialMedia: task.socialMedia,
            schoolId: task.schoolId,
          })
        );
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
      schoolIds: rootStore.schoolsStore.activeSchoolsIds,
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
