export interface IUserTasks {
  TaskId?: number;
  UserId?: number |null | undefined;
  Description: string;
  TimeStamp: string;
  Title: string;
  DueDate: string;
  Importance: number;
  Weight: number;
  Urgency: number;
}
