import {Component, Injector, OnInit} from '@angular/core';
import {NgbNav} from "@ng-bootstrap/ng-bootstrap";
import {NgIf} from "@angular/common";
import {auto, end} from "@popperjs/core";
import {PomodoroService} from "../services/pomodoro.service";
import {PomodoroInfo} from "../Entity/PomodoroInfo";
import {Parser} from "@angular/compiler";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [
    NgbNav, NgIf, MatProgressSpinnerModule, MatButtonModule, MatCard, MatCardHeader,
    MatCardTitleGroup, MatCardContent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent implements OnInit {
  /* @newSession: bool if the user can start a new session (true) or a timer is running (false),
  necessary for showing the right element in html
  * @countdownMinutes: remaining minutes of timer, for interpolation
  * @countdownSeconds: remaining of seconds in current minute, for interpolation
  * @progressValue: calculated Process for progress spinner
  * constructor binds a PomodoroService
  */
  newSession = true
  countdownMinutes: any
  countdownSeconds: any
  progressValue=0

  constructor(private service: PomodoroService) {
  }

  ngOnInit() {
    this.newSession = !this.service.isTimer
    if (!this.newSession) {
      let noInfo: PomodoroInfo = {
        startTime: new Date(), duration: 0, shortBreak: 0,
        longBreak: 0, intervals: 0
      }
      this.subscriber()
    }
  }

  public startPomodoro() {
    /* takes the input from the input and starts the pomodoro timer (startPomodoro).
    * triggers the subscribe and asks for notification.
    */
    try {
      let pomodoroInfo: PomodoroInfo = {
        startTime: new Date(),
        duration: parseInt((<HTMLInputElement>document.getElementById("duration")).value),
        shortBreak: parseInt((<HTMLInputElement>document.getElementById("shortBreak")).value),
        longBreak: parseInt((<HTMLInputElement>document.getElementById("longBreak")).value),
        intervals: parseInt((<HTMLInputElement>document.getElementById("intervalCount")).value)
      }
      let timeSub = this.service.startPomodoro(pomodoroInfo)
      this.subscriber()
      this.newSession = false
      this.service.isTimer = true
      this.setNotification()
    }
    catch (ex){
      alert("error startPomodoro")
    }
  }

  private subscriber(){
    /* sets the @countdownMinutes, @countdownSeconds and @progressValue from return of subscribed service */
    this.service.getCountdown().subscribe(({max, time}) => {
      this.countdownMinutes = Math.floor(time.getMinutes()/10)==0 ? "0"+time.getMinutes() : time.getMinutes()
      this.countdownSeconds = Math.floor(time.getSeconds()/10)==0 ? "0"+time.getSeconds() : time.getSeconds()
      let subVal = max/100
      this.progressValue = (max-time.getTime())/subVal;
    })
  }

  public resetPomodoro(){
    /* just resets the timer, new session possible for user */
    console.log("zurücksetzen")
    this.newSession = true

  }

  private setNotification(){
    /* asks for permission to send notifications when the time has changed */
    if (Notification.permission !== "denied") {
      Notification.requestPermission().then();
    }
  }

}
