import { Component } from '@angular/core';
import {NgForOf, UpperCasePipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {TaskService} from "../services/task.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    UpperCasePipe,
    FormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  toDo:any = ["i",2,34,7]

  trackByFn(index: number, item: any): number {
    return item.id; // oder eine andere eindeutige ID des Items
  }


}
