import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {E} from '@angular/core/src/render3';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  rForm: FormGroup;
  task = new Task();
  today = new Date();

  @Output() reload = new EventEmitter();

  constructor(private taskService: TaskService, fb: FormBuilder) {
    this.rForm = fb.group({
      'description': [null, [Validators.required, Validators.maxLength(128)]],
      'finishDate': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(f: FormGroup) {

    this.task.description = f.controls['description'].value;
    this.task.finishDate = new Date(f.controls['finishDate'].value);

    this.taskService.addTask(this.task).subscribe(() =>
      this.reload.emit()
    );
    this.task = new Task();
    f.reset();

  }

}
