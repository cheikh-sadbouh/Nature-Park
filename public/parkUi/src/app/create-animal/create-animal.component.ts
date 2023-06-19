import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../animal.service';
import { ParkAnimal } from '../parks/park';

@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.css']
})
export class CreateAnimalComponent {
  animalPark= {} as ParkAnimal ;  
  parkId:any;

  showSuccessMessage = false;
  animalPicture: File | null = null;
 constructor(private route: ActivatedRoute, private animalServie:AnimalService){}

 ngOnInit(): void {
  this.getParkByIdFromRoute();
}

getParkByIdFromRoute(): void {
  this.parkId = this.route.snapshot.paramMap.get('parkId');
}

onSubmit(): void {
  console.log(this.animalPark); 

  this.animalServie.createParkAnimal(this.parkId,this.animalPark)
    .subscribe({
      next: response => {
        console.log('Animal created successfully:', response);
        this.showSuccessMessage = true;
        this.animalPark = {
          _id:'',
          name: '',
          picture: '',
          description: ''
        };
      },
      error: error => {
        console.error('Error creating animal:', error);
      }
    });
}



  
  onAnimalPictureSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files && files.length > 0) {
      this.animalPicture = files[0];
      this.convertImageToBase64(this.animalPicture).then(base64 => {
        console.log(base64); 

        this.animalPark.picture= base64;
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
