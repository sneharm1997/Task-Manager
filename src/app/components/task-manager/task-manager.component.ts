import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: ITask[] = [];
  tasksCopy: ITask[] = [];
  inProgressCopy: ITask[] = [];
  doneCopy: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];
  filteredString!: string;
  filteredTasks: ITask[] = [];
  inToDo: boolean = false;
  inInProgress: boolean = false;

  constructor(public dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(data => {
      this.tasks = data;
      this.tasksCopy = data;
    })
    this.taskService.inProgress$.subscribe(data => {
      this.inProgress = data;
      this.inProgressCopy = data;
    })
    this.taskService.done$.subscribe(data => {
      this.done = data;
      this.doneCopy = data;
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogContentComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteTask(i: number) {
    this.taskService.deleteTask(i)
  }

  deleteInProgress(i: number) {
    this.taskService.deleteInProgress(i);
  }

  deleteDone(i: number) {
    this.taskService.deleteDone(i);
  }

  search(searchString: string) {
    if (searchString.length) {
      this.filteredTasks = [];
      this.inInProgress = false;
      this.inToDo = false;
      for (let task of this.tasks) {
        if (task['title'].toLowerCase().includes(searchString.toLowerCase())) {
          this.filteredTasks.push(task);
          this.inToDo = true;
        }
      }
      for (let task of this.inProgress) {
        if (task['title'].toLowerCase().includes(searchString.toLowerCase())) {
          this.filteredTasks.push(task);
          this.inInProgress = true;
        }
      }
      for (let task of this.done) {
        if (task['title'].toLowerCase().includes(searchString.toLowerCase())) {
          this.filteredTasks.push(task);
        }
      }
      if (this.inToDo) {
        this.tasks = this.filteredTasks;
        return this.tasks;
      }
      else if (this.inInProgress) {
        this.inProgress = this.filteredTasks;
        return this.inProgress
      }
      else {
        this.done = this.filteredTasks;
        return this.done;
      }
    } else {
      this.tasks = this.tasksCopy;
      this.inProgress = this.inProgressCopy;
      this.done = this.doneCopy;

      return this.tasks, this.inProgress, this.done;
    }
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
