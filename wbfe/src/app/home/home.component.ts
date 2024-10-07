import { Component } from '@angular/core';
import {PomodoroComponent} from "../pomodoro/pomodoro.component";
import {ReminderComponent} from "../reminder/reminder.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PomodoroComponent,
    ReminderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
