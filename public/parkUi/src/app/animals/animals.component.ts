import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkService } from '../park.service';
import { Park } from '../parks/park';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  park!: Park;
  id!: any;
  constructor(private parkService: ParkService, private route: ActivatedRoute,private animalServie:AnimalService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.fetchParkById(this.id);
    });
  }

  fetchParkById(id: string | null): void {
    if (id) {
      this.parkService.getParkById(this.id).subscribe({
        next: (park: Park) => {
          this.park = park;
        },
        error: (error) => {
          console.log('Error:', error);
        }
      });
    }
  }

  deleteAnimal(animalId:string){

 this.animalServie.deleteParkAnimal(this.id,animalId).subscribe({
    next: (response) => {
      console.log('Parks retrieved successfully:');
      this.fetchParkById(this.id);
    },
    error: (error) => {
      console.error('Error retrieving parks:', error);
    }
  });
  }
}
