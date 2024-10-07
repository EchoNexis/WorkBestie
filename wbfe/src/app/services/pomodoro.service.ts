import { Injectable } from '@angular/core';
import {interval, Subject} from "rxjs";
import {PomodoroInfo} from "../Entity/PomodoroInfo";
import {ProgressInfo} from "../Entity/ProgressInfo";
import {end} from "@popperjs/core";

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {

  private id: any = null
  private progress = new Subject<ProgressInfo>()
  private info: any
  private endTime = new Date()
  public isTimer = false

  private intervalCounter = 1
  private isBreak = false

  constructor() {}

  public startPomodoro(info: PomodoroInfo){
    // save the pomodoro info file for further calculation
    if (!this.id){
      this.info = info
      //calculating the first end Time
      this.endTime = new Date( info.startTime.getTime()+info.duration*60000 )
      //logic for returning subject
      this.id = setInterval(()=>{
        /* Logic:
        * look at intervals, short=intervals-1, long=1
        * have internal counter and isBreak, will be switched every time
        * if switched, look up wich break and set time
        */

        if (Number((new Date().getTime()) - this.endTime.getTime() > 0)){
          this.isBreak = !this.isBreak
          this.info.startTime = new Date()
          if (this.isBreak){
            if (this.intervalCounter % (this.info.intervals) == 0) {
              this.endTime = new Date(this.info.startTime.getTime() + this.info.longBreak * 60000)

            } else {
              this.endTime = new Date(this.info.startTime.getTime() + this.info.shortBreak * 60000);
            }
            /*this.endTime = this.intervalCounter%(this.info.intervals-1)==0 ?
              new Date(this.info.startTime.getTime()+this.info.shortBreak*6000) :
              new Date(this.info.startTime.getTime()+this.info.longBreak*6000)*/
            this.intervalCounter++
          }
          else {
            this.endTime = new Date( info.startTime.getTime()+info.duration*60000 )
          }

        }
        let countdown = new Date(this.endTime.getTime()-(new Date().getTime()))
        this.progress.next({
          time: new Date(this.endTime.getTime()-(new Date().getTime())),
          max: this.endTime.getTime()-this.info.startTime.getTime()
        });}, 100)
    }
  }

  public getCountdown(){
    return this.progress
  }





}
