import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$=new BehaviorSubject<ITask[]>([]);
  inProgress$=new BehaviorSubject<ITask[]>([]);
  done$=new BehaviorSubject<ITask[]>([]);

  tasks:ITask[]=[];
  inProgress: ITask[]=[];
  done: ITask[]=[];
  file: any;

  constructor() { }

  addTask(form:FormGroup,file: any) {
    console.log(file)
    this.tasks.push({
     title:form.controls['newTask'].value,
     dueDate:form.controls['dueDate'].value,
     assignee:form.controls['assignee'].value,
     description:form.controls['description'].value,
     file:this.file
    })
     this.tasks$.next(this.tasks);
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
    this.tasks$.next(this.tasks);
  }

  deleteInProgress(i: number) {
    this.inProgress.splice(i, 1);
    this.inProgress$.next(this.inProgress);
  }

  deleteDone(i: number) {
    this.done.splice(i, 1);
    this.done$.next(this.done);
  }

  sendFile(link:any){
    this.file= link;
  }

  getFile(){
    return this.file;
  }
}
