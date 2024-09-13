import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.sass'
})
export class CanvasComponent {

  width: number = 900;
  height: number = 900;

  cursorX: number = 0;
  cursorY: number = 0;

  @ViewChild("canvas") canvas?: ElementRef<HTMLCanvasElement>

  pathDrawing: boolean = false;




  nMouseDown($event: Event) {
    console.log($event);
    if ($event instanceof MouseEvent) {
      this.cursorX = $event.clientX;
      this.cursorY = $event.clientY;
      let canvas = this.canvas?.nativeElement;

      canvas?.getContext('2d')?.beginPath();
      canvas?.getContext('2d')?.moveTo(this.cursorX, this.cursorY);

      //this.canvas?.nativeElement.getContext()

      this.pathDrawing = true;
    }
  }

  onnMouseMove($event: Event) {
    if ($event instanceof MouseEvent) {


      if (!this.pathDrawing)
        return

      let canvas = this.canvas?.nativeElement;

      canvas?.getContext('2d')?.beginPath();
      canvas?.getContext('2d')?.moveTo(this.cursorX, this.cursorY);
      canvas?.getContext('2d')?.lineTo($event.clientX, $event.clientY);
      canvas?.getContext('2d')?.stroke();

      this.cursorX = $event.clientX;
      this.cursorY = $event.clientY;

    }

  }

  onMouseUp($event: Event) {
    console.log($event);
    if ($event instanceof MouseEvent) {
      this.cursorX = $event.clientX;
      this.cursorY = $event.clientY;

      let canvas = this.canvas?.nativeElement;

      canvas?.getContext('2d')?.closePath();

      this.pathDrawing = false;
    }
  }
}
