import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';


@Injectable()
export class TasksService {
  private _tasks: Task[];

  constructor() {
    this._tasks = [];
  }

  getAllTasks(): Task[] {
    return this._tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const {status, search} = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((t: Task) => t.status === status);
    }

    if (search) {
      tasks = tasks.filter(({title, description}: Task) => title.includes(search) || description.includes(search));
    }

    return tasks;
  }

  getTaskById(id: string): Task[] {
    const task = this._tasks.filter((t: Task) => t.id === id);

    if (task) {
      return task;
    } else {
      throw new NotFoundException();
    }
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this._tasks.push(task);

    return task;
  }

  deleteTask(id: string): Task {
    const task = this._tasks.find((t: Task) => t.id === id);

    if (task) {
      this._tasks = this._tasks.filter((t: Task) => t.id !== id);
      return task;
    } else {
      throw new NotFoundException();
    }
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this._tasks.find((t: Task) => t.id === id);

    if (task) {
      task.status = status;
      return task;
    } else {
      throw new NotFoundException();
    }
  }
}
