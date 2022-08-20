import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  todoForm !: FormGroup;
  file: any;

  constructor(private fb: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      newTask: new FormControl(''),
      dueDate: new FormControl(''),
      assignee: new FormControl(''),
      description: new FormControl('')
    })
  }

  addTask(form: FormGroup) {
    this.file = this.taskService.getFile();
    this.taskService.addTask(form, this.file);
  }

  defaultAssign(form: FormGroup) {
    this.todoForm.patchValue({
      assignee: 'Sneha R M'
    })
  }
}
