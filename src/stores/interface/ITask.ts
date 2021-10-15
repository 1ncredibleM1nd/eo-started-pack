export interface ITask {
  id: number | null;
  content: string;
  creatorId: number | null;
  status: string;
  createdAt: number | number[];
  timestampDateToComplete: number | number[];
}
