import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from "../task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  today = new Date();
  activeIndex = null;
  tempTask: Task;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  enableEdit(i) {
    this.activeIndex = i;
    this.tempTask = Object.assign({}, this.tasks[i]);
  }

  cancelEdit() {
    this.activeIndex = null;
    this.tempTask = new Task();
  }

  updateTask(i) {
    if (this.tempTask.description != "") {
      this.taskService.updateTask(Object.assign({}, this.tempTask), i);
    }
    this.activeIndex = null;
    this.tempTask = new Task();
  }

  deleteTask(i) {
    this.taskService.removeTask(i);
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

}
