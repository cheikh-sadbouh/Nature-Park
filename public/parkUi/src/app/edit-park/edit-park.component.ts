import { Component, OnInit } from '@angular/core';
import { ParkService } from '../park.service';
import { Park } from '../parks/park';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-park',
  templateUrl: './edit-park.component.html',
  styleUrls: ['./edit-park.component.css']
})
export class EditParkComponent implements OnInit {
  park= {} as Park ;  
  parkId:any;

  showSuccessMessage = false;
  parkPicture: File | null = null;
  animalPicture: File | null = null;
 constructor(private route: ActivatedRoute, private parkServie:ParkService){}

 ngOnInit(): void {
  this.getParkByIdFromRoute();
}

getParkByIdFromRoute(): void {
  this.parkId = this.route.snapshot.paramMap.get('id');
  this.parkServie.getParkById(this.parkId).subscribe({
    next: (park) => {
      this.park = park;
      console.log('Park retrieved successfully:', this.park);
    },
    error: (error) => {
      console.error('Error retrieving park:', error);
    }
  });
}

onSubmit(): void {
  console.log(this.park); 

  this.parkServie.updatePark(this.parkId,this.park)
    .subscribe({
      next: response => {
        console.log('Park updated successfully:', response);
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
        console.error('Error updating park:', error);
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



  



