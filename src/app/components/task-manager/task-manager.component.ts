import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  todoForm !: FormGroup;
  tasks:ITask[]=[];
  inProgress:ITask[]=[];
  done:ITask[]=[];


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item:['',Validators.required]
    })
  }

  addTask(event: any){
this.tasks.push({
  description:this.todoForm.value.item,
  done:false
})
  }

  deleteTask(i:number){
    this.tasks.splice(i,1)
  }

  deleteInProgress(i:number){
    this.inProgress.splice(i,1)
  }

  deleteDone(i:number){
    this.done.splice(i,1)
  }

  editTask(i:number){

  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
