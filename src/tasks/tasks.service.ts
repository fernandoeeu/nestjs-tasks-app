import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    return;
  }

  getTaskById(taskId: string): Task {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      return task;
    } else {
      return {} as Task;
    }
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      ...createTaskDto,
      id: uuidv4(),
      status: TaskStatus.TODO,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  updateTaskStatus(id: string, taskStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = taskStatus;
    return task;
  }
}
