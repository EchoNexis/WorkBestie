import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from "@ng-bootstrap/ng-bootstrap";
import {HomeComponent} from "./home/home.component";
import {HistoryComponent} from "./history/history.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbNav, NgbNavItem, NgbNavLinkButton, NgbNavOutlet, HomeComponent, HistoryComponent, NgbNavContent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wbfe';
}
