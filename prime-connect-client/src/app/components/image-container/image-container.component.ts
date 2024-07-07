import { Component, ElementRef, HostListener,Output,EventEmitter,Input,ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { Coord } from 'ngx-image-zoom';
@Component({
  selector: 'image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnChanges{
  xCoord: number = 0;
  yCoord: number = 0;
  @Output() passCoord = new EventEmitter<number[]>();
  scaleStep: number = 0.5;
  @Input() myThumbnail = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  @Input() imageLoade!: boolean;
  constructor(private nzImageService: NzImageService, private elementRef: ElementRef) {}
  onClick(): void {
    this.imageLoade = true;
  }
  @ViewChild('blinkContainer', { static: true }) blinkContainer!: ElementRef;
  handleClick(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;

    // Set the position of the blink container
    this.blinkContainer.nativeElement.style.left = `${x}px`;
    this.blinkContainer.nativeElement.style.top = `${y}px`;

    // Apply the blink class to trigger the effect
    this.blinkContainer.nativeElement.classList.add('blink');

    // Remove the blink class after a short delay to stop the effect
    setTimeout(() => {
      this.blinkContainer.nativeElement.classList.remove('blink');
    }, 500); // Adjust this timeout to match your animation duration
  }

ngOnChanges(changes: SimpleChanges): void {
    if(changes['imageLoade']) {
      console.log(changes['imageLoade'].currentValue);
    }
}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // this.imageLoade = false;
    }
  }
  closeImage(): void {
    this.imageLoade = false;
  }
  handleZoomPosition(event: Coord) {
    this.xCoord = event.x;   //we get the coordinates here
    this.yCoord = event.y;
    this.passCoord.emit([this.xCoord, this.yCoord]);  //we pass the coordinates to the parent component
    this.blinkContainer.nativeElement.style.left = `${this.xCoord}px`;
    this.blinkContainer.nativeElement.style.top = `${this.yCoord}px`;

    // Apply the blink class to trigger the effect
    this.blinkContainer.nativeElement.classList.add('blink');

    // Remove the blink class after a short delay to stop the effect
    setTimeout(() => {
      this.blinkContainer.nativeElement.classList.remove('blink');
    }, 500);
    console.log('Zoom position:', event.x, event.y);
  }
}