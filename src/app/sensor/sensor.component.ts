import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";


interface Sensor {
  start():void
}
interface Accelerometer extends EventTarget, Sensor{
  new(options?: SensorOptions): Accelerometer;
  x: number;
  y: number;
  z: number;
}

declare var Accelerometer : {
  prototype: Accelerometer
  new(options?: SensorOptions): Accelerometer
}

interface SensorOptions {
  frequency: number;
}

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.sass'
})
export class SensorComponent implements OnInit{

  accelerometer?: Accelerometer;

  acceleration: number = -1;

  velocity: [number,number,number] = [0,0,0];

  t0: [number,number,number] = [0,0,0]

  ngOnInit(): void {

    // @ts-ignore
    navigator.permissions.query({ name: "accelerometer" }).then((result) => {
      if (result.state === "denied") {
        console.log("Permission to use accelerometer sensor is denied.");
        return;
      }
      // Use the sensor.
      this.accelerometer = new Accelerometer({frequency:60})
      this.accelerometer.addEventListener("reading",() => {
        if (this.accelerometer) {
          this.acceleration = Math.hypot(this.accelerometer?.x, this.accelerometer?.y,this.accelerometer?.z);

          // v = u + at
          this.velocity = [this.t0[0]+this.accelerometer?.x/60,
            this.t0[1]+this.accelerometer?.y/60,
            this.t0[2]+this.accelerometer?.z/60,
          ]

          this.t0 = [this.accelerometer?.x, this.accelerometer?.y,this.accelerometer?.z]

        }

      })
      this.accelerometer.start()
    });
  }
}
