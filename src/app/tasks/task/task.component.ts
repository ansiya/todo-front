import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Task } from '../task';
import { TaskService } from '../task.service';
import {EmptyError} from "rxjs/index";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task = new Task();

  @Output() messageEvent = new EventEmitter<Task>();

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if(this.task.description != "" ){
      this.task.finishDate = new Date();
      this.taskService.addTask(Object.assign({}, this.task));
      this.task = new Task();
      f.resetForm();
    }
  }

}
