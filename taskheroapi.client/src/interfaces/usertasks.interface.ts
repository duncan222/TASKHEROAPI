export interface IUserTasks {
  taskId?: number;
  userId?: number | null | undefined;
  description: string;
  timeStamp: string;
  title: string;
  dueDate: string;
  importance: number;
  weight: number;
  urgency: number;
}
