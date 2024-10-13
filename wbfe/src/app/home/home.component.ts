import { Component } from '@angular/core';
import {PomodoroComponent} from "../pomodoro/pomodoro.component";
import {TaskComponent} from "../task/task.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PomodoroComponent,
    TaskComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
