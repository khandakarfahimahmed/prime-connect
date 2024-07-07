import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SenderService } from '../../../services/sender/sender.service';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrl: './image-loader.component.css',
})
export class ImageLoaderComponent implements OnInit {
  @Input() image_array!: any[];
  images!: any[];
  currentIndex: number = 0;
  fieldValue: any;
  coordinateX: number = 0; //  Do not change the value
  coordinateY!: number;
  constructor(private sharedService: SenderService) {}
  coordinates: any;
  ngOnInit(): void {

    console.log('image array loader', this.image_array)
    console.log('image loader', this.images)
    console.log('image array loader', this.coordinateY);
    // this.images = [
    //   'https://res.cloudinary.com/dr3buczbc/image/upload/v1713023937/images/image3.png',
    //   'https://res.cloudinary.com/dr3buczbc/image/upload/v1710740206/images/image4.png',
    // ];
    console.log('images', this.images)
    this.sharedService.fieldValue$.subscribe((value) => {
      
      console.log('dog', value)
      this.coordinates = this.getCoordinatesById(this.image_array, String(value));
      // console.log('coor',coor);

      this.fieldValue = value;

      for (let i = 0; i < this.image_array.length; i++) {
          let img = this.image_array[i].id;
          // console.log('img',img)
        if (img == this.fieldValue) {
         
          this.coordinates = this.image_array[i].coordinates;
          this.coordinateY =  this.coordinates[0][1] - 20
          this.images = this.image_array[i].images;
          // this.coordinates = this.image_array[i].coordinates;
        }
      }
      console.log('coordinates', this.coordinateY);	
    });
   

    // Ensure that image_array is defined and contains elements before accessing it
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  // Listen for arrow key events
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.previousSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    
      this.coordinateY = this.coordinates[this.currentIndex][1] - 20;
    }
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
   
      this.coordinateY = this.coordinates[this.currentIndex][1] -20;
    }
  }


 getCoordinatesById(data: any, targetId: string): number[] | null {
  const item = data.find((element: any) => element.uuid === targetId);
  return item ? item.coordinates : null;
}
  // goToSlide(index: number) {
  //   this.currentIndex = index;
  //   if (this.image_array && this.image_array.length > this.currentIndex) {
  //     this.images = this.image_array[this.currentIndex];
  //   }
  // }
}
