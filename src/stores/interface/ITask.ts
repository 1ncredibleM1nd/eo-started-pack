export interface ITask {
  id: number;
  content: string;
  creatorId?: number;
  status: string;
  createdAt: number;
  timestampDateToComplete: number;
}
