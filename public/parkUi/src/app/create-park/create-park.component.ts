import { Component } from '@angular/core';
import { Park,ParkAnimal } from '../parks/park';
import { ParkService } from '../park.service';

@Component({
  selector: 'app-create-park',
  templateUrl: './create-park.component.html',
  styleUrls: ['./create-park.component.css']
})
export class CreateParkComponent {
  park: Park = {
    _id:'',
    parkName: '',
    country: '',
    picture: '',
    parkAnimals: [{
      _id:'',
      name: '',
      picture: '',
      description: ''
    }]
  };
  showSuccessMessage = false;

  

  parkPicture: File | null = null;
  animalPicture: File | null = null;
 constructor(private parkServie:ParkService){}
 onSubmit(): void {
  console.log(this.park); 
  const { _id, ...parkWithoutId } = this.park;
  const parkAnimals = parkWithoutId.parkAnimals.map(({ _id: animalId, ...animal }) => animal) as ParkAnimal[];
  
  parkWithoutId.parkAnimals = parkAnimals;
  
  this.parkServie.createPark(parkWithoutId)
    .subscribe({
      next: response => {
        console.log('Park created successfully:', response);

     
        this.showSuccessMessage = true;
        this.park = {
          _id:'',
          parkName: '',
          country: '',
          picture: '',
          parkAnimals: [{
            _id:'',
            name: '',
            picture: '',
            description: ''
          }]
        };
      },
      error: error => {
        
        console.error('Error creating park:', error);
      }
    });
}


  
  onParkPictureSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files && files.length > 0) {
      this.parkPicture = files[0];
      this.convertImageToBase64(this.parkPicture).then(base64 => {
        console.log(base64);
        this.park.picture= base64;

      });
    }
  }
  
  onAnimalPictureSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files && files.length > 0) {
      this.animalPicture = files[0];
      this.convertImageToBase64(this.animalPicture).then(base64 => {
        console.log(base64); 

        this.park.parkAnimals[0].picture= base64;
      });
    }
  }
  

  convertImageToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('Failed to convert image to base64.');
        }
      };
      reader.onerror = () => {
        reject('Failed to read the image file.');
      };
      reader.readAsDataURL(file);
    });
  }




}
