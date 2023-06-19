import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Park } from './parks/park';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private baseUrl = environment.BASE_URL ;

  constructor(private http: HttpClient) { }

  // Create a new park
  createPark(parkData: any): Observable<Park> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Park>(this.baseUrl, parkData);
  }

  // Get all parks
  getParks(): Observable<Park[]> {
    return this.http.get<Park[]>(this.baseUrl);
  }

  // Get a park by ID
  getParkById(id: string): Observable<Park> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Park>(url);
  }

  // Update a park
  updatePark(id: string, parkData: Park): Observable<Park> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Park>(url, parkData);
  }

  // Delete a park
  deletePark(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
