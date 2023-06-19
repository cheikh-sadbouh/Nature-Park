import { Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import { ParkService } from '../park.service';
import { Park } from './park';

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css']
})
export class ParksComponent implements OnInit {

constructor(private _parkService:ParkService,private router: Router){}
  ngOnInit(): void {
    this.getAllParks()
    }
parks: Park[] = []; 
  



getAllParks(): void {
 this._parkService.getParks().subscribe({
   next: (response) => {
     this.parks = response;
     console.log('Parks retrieved successfully:', this.parks);
   },
   error: (error) => {
     console.error('Error retrieving parks:', error);
   }
 });
}

deletePark(parkId:string): void {

  this._parkService.deletePark(parkId).subscribe({
    next: (response) => {
      console.log('Parks retrieved successfully:');
      this.getAllParks()
    },
    error: (error) => {
      console.error('Error retrieving parks:', error);
    }
  });
 }
}
