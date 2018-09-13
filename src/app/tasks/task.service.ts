import { Injectable } from '@angular/core';
import { Task } from './task';
import { TASKS } from './task-list/mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Task[] {
    return TASKS;
  }

  addTask(task: Task): void {
    TASKS.push(task);
  }

  updateTask(task: Task, i:number): void {
    TASKS[i] = task;
  }

  removeTask(i:number){
    TASKS.splice(i, 1);
  }
}
