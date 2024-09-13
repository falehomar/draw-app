import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CanvasComponent} from "./canvas/canvas.component";
import {SensorComponent} from "./sensor/sensor.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CanvasComponent, SensorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'draw-app';
}
