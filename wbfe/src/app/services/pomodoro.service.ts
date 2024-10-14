import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {PomodoroInfo} from "../Entity/PomodoroInfo";
import {ProgressInfo} from "../Entity/ProgressInfo";

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {
  /* @id: id of connected component
  * @progress: returned object that contains remaining time of the current session
  * @info: information on how to start and manage the time
  * @endTime: global end time of the current session
  * @intervalCounter: counts the intervals to choose between short and long break
  * @isBreak: if the current session is a learning or break session
  * */

  private id: any = null
  private progress = new Subject<ProgressInfo>()
  private info: any
  private endTime = new Date()
  public isTimer = false
  private intervalCounter = 1
  private isBreak = false

  constructor() {}

  public startPomodoro(info: PomodoroInfo){
    /* Sets an Interval, not in relation with inervalCounter, that changes the @progress object.
    * Shows notification every time the time changes (learning, short/long break).
    * If the time of the current session is over, based on @isBreak, @intervalCounter and @info
    * we calculate what time we have to set (learning, short/long break).
    * Additionally we are calculating the max time in Date.getTime() for the progress Spinner.
    * */
    console.log(this.id)
    this.info = info
    this.endTime = new Date( info.startTime.getTime()+info.duration*60000 )
    this.showNotification()
      this.id = setInterval(()=>{
        /* Logic: look at intervals, short=intervals-1, long=1, have internal counter and isBreak, will be switched
        every time, if switched, look up wich break and set time */
        if (Number((new Date().getTime()) - this.endTime.getTime() > 0)){
          this.isBreak = !this.isBreak
          this.info.startTime = new Date()
          if (this.isBreak){
            this.endTime = this.intervalCounter%this.info.intervals==0 ?
              new Date(this.info.startTime.getTime()+this.info.longBreak*60000) :
              new Date(this.info.startTime.getTime()+this.info.shortBreak*60000)
            this.intervalCounter++
          }
          else {
            this.endTime = new Date( info.startTime.getTime()+info.duration*60000 )
          }
          this.showNotification()

        }
        this.progress.next({
          time: new Date(this.endTime.getTime()-(new Date().getTime())),
          max: this.endTime.getTime()-this.info.startTime.getTime()
        });}, 100)

  }

  public getCountdown(){
    /* returns the current time */
    return this.progress
  }

  private showNotification(){
    /* shows the notification when a new time has started */
    let text
    if (!this.isBreak){
      text="Time to focus, keep pushing!"
    }
    else {
      text = this.intervalCounter%this.info.intervals==0 ?
        "Time for a long break!" : "Time for a shor break!"
    }
    new Notification("Pomodoro Timer",{
      body:text
    })
  }

}
