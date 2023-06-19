import { Component } from '@angular/core';
import { ParkAnimal } from '../parks/park';
import { ActivatedRoute } from '@angular/router';
import { ParkService } from '../park.service';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent {
  animalPark= {} as ParkAnimal ;  
  parkId:any;
  animalId:any;

  showSuccessMessage = false;
  animalPicture: File | null = null;
 constructor(private route: ActivatedRoute, private animalServie:AnimalService){}

 ngOnInit(): void {
  this.getParkByIdFromRoute();
}

getParkByIdFromRoute(): void {
  this.parkId = this.route.snapshot.paramMap.get('parkId');
  this.animalId = this.route.snapshot.paramMap.get('animalId');
  this.animalServie.getParkAnimalById(this.parkId,this.animalId).subscribe({
    next: (animal) => {
      this.animalPark = animal;
      console.log('Park retrieved successfully:', this.animalPark);
    },
    error: (error) => {
      console.error('Error retrieving park:', error);
    }
  });
}

onSubmit(): void {
  console.log(this.animalPark); 

  this.animalServie.updateParkAnimal(this.parkId,this.animalId,this.animalPark)
    .subscribe({
      next: response => {
        console.log('Park updated successfully:', response);
        this.showSuccessMessage = true;
        this.animalPark = {
          _id:'',
          name: '',
          picture: '',
          description: ''
        };
      },
      error: error => {
        console.error('Error updating park:', error);
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
