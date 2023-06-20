import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkAnimal } from './parks/park';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = environment.BASE_URL+"/parks" ;

  constructor(private http: HttpClient) { }

  getAllParkAnimals(parkId: string): Observable<ParkAnimal[]> {
    return this.http.get<ParkAnimal[]>(`${this.apiUrl}/${parkId}/parkAnimals`);
  }

  getParkAnimalById(parkId: string,animalId:string): Observable<ParkAnimal> {
    const url = `${this.apiUrl}/${parkId}/parkAnimals/${animalId}`;
    return this.http.get<ParkAnimal>(url);
  }

  createParkAnimal(parkId: string,parkAnimal: ParkAnimal): Observable<ParkAnimal> {
    return this.http.post<ParkAnimal>(`${this.apiUrl}/${parkId}/parkAnimals`, parkAnimal);
  }

  updateParkAnimal(parkId: string,animalId:string, parkAnimal: ParkAnimal): Observable<ParkAnimal> {
    const url = `${this.apiUrl}/${parkId}/parkAnimals/${animalId}`;
    return this.http.put<ParkAnimal>(url, parkAnimal);
  }

  deleteParkAnimal(parkId: string,animalId:string): Observable<void> {
    const url = `${this.apiUrl}/${parkId}/parkAnimals/${animalId}`;
    return this.http.delete<void>(url);
  }
}
