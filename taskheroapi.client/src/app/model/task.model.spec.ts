import { Task } from './task.model';

describe('Task', () => {
  it('should create an instance', () => {
    const taskInstance: Task = {
      id: 1,
      task_name: 'Sample Task',
      description: 'Sample Description',
      timeStamp: '2024-03-28',
      title: 'Sample Title',
      dueDate: '2024-04-30',
      importance: 5,
      weight: 3,
      urgency: 4
    }; 
    expect(taskInstance).toBeTruthy();
  });
});
