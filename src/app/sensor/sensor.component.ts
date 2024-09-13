import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";

interface SensorErrorEvent extends Event {
  error: DOMException;
}
enum SensorPermission {
  accelerometer = 'accelerometer',
  gyroscope = 'gyroscope',
  magnetometer = 'magnetometer',
  ambient_light_sensor = 'ambient-light-sensor',
}

interface SensorOptions {
  frequency: number;
}

interface Sensor {
  start():void
  stop():void
  permissionPolicyName(): string
  permissions: SensorPermission[]
  activated: boolean
  hasReading: boolean
  timestamp: DOMHighResTimeStamp
}


interface AbsoluteOrientationSensor extends EventTarget, Sensor, OrientationSensor {
  new(options?: SensorOptions): AbsoluteOrientationSensor;
}

declare var AbsoluteOrientationSensor : {
  prototype: AbsoluteOrientationSensor
  new(options?: SensorOptions): AbsoluteOrientationSensor
}

interface RelativeOrientationSensor extends EventTarget, Sensor, OrientationSensor {
  new(options?: SensorOptions): RelativeOrientationSensor;
}

declare var RelativeOrientationSensor : {
  prototype: RelativeOrientationSensor
  new(options?: SensorOptions): RelativeOrientationSensor
}

interface OrientationSensor extends EventTarget, Sensor{
  new(options?: SensorOptions): OrientationSensor;
  quaternion: DOMPointReadOnly;
}

declare var OrientationSensor : {
  prototype: OrientationSensor
  new(options?: SensorOptions): OrientationSensor
}


interface Gyroscope extends EventTarget, Sensor{
  new(options?: SensorOptions): Gyroscope;
  x: number;
  y: number;
  z: number;
}

declare var Gyroscope : {
  prototype: Gyroscope
  new(options?: SensorOptions): Gyroscope
}

interface GravitySensor extends EventTarget, Sensor{
  new(options?: SensorOptions): GravitySensor;
  illuminance: number;
}

declare var GravitySensor : {
  prototype: GravitySensor
  new(options?: SensorOptions): GravitySensor
}

interface AmbientLightSensor extends EventTarget, Sensor{
  new(options?: SensorOptions): AmbientLightSensor;
  illuminance: number;
}

declare var AmbientLightSensor : {
  prototype: AmbientLightSensor
  new(options?: SensorOptions): AmbientLightSensor
}

interface Magnetometer extends EventTarget, Sensor{
  new(options?: SensorOptions): Magnetometer;
  x: number;
  y: number;
  z: number;
}

declare var Magnetometer : {
  prototype: Magnetometer
  new(options?: SensorOptions): Magnetometer
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

interface LinearAccelerationSensor extends Accelerometer{
  new(options?: SensorOptions): LinearAccelerationSensor;
}

declare var LinearAccelerationSensor : {
  prototype: LinearAccelerationSensor
  new(options?: SensorOptions): LinearAccelerationSensor
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

  timestamp: DOMHighResTimeStamp = new Date().getTime();
  hasReading: boolean = false;
  activated: boolean = false;

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

          this.timestamp = this.accelerometer.timestamp
          this.hasReading = this.accelerometer.hasReading
          this.activated = this.accelerometer.activated
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
