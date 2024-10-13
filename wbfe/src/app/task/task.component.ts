import { Component } from '@angular/core';
import {NgForOf, UpperCasePipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    UpperCasePipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  num = [1,2]


 public saveTask(){

 }

  public deleteTask(){
    this.num.pop()
  }

}
