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
  tempDate: string;
  errorMsg: string;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  enableEdit(i) {
    this.activeIndex = i;
    this.tempDate = this.tasks[i].finishDate.toISOString().substring(0,10);
    this.tempTask = Object.assign({}, this.tasks[i]);
  }

  cancelEdit() {
    this.activeIndex = null;
    this.tempTask = new Task();
  }

  updateTask(i) {
    if (this.tempTask.description != "") {
      this.tempTask.finishDate = new Date(this.tempDate);
      this.taskService.updateTask(Object.assign({}, this.tempTask), i);
      this.activeIndex = null;
      this.tempTask = new Task();
    }
  }

  deleteTask(i) {
    const id = this.tasks[i]._id;
    this.taskService.removeTask(id).subscribe(() =>
      this.getTasks()
    );
  }

  getTasks(): void {
   this.taskService.getTasks()
     .subscribe((tasks) => {
       if(!tasks || tasks.length === 0){
         this.errorMsg = "You haven't planned any task yet.";
         console.log(this.errorMsg);
       }
       this.tasks = tasks;
     });
  }

}
