import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgChartsConfiguration } from 'ng2-charts';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  //templateUrl: './app.html',
  styleUrl: './app.css',
  template: `
  <div class="container">
    <div class="grid">
  <router-outlet></router-outlet>
    </div>
  </div>
  
  `
  
})
export class App {
  protected readonly title = signal('frontend');
}
