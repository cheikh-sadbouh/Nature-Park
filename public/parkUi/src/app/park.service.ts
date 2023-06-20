import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Park } from './parks/park';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private baseUrl = environment.BASE_URL+"/parks" ;

  constructor(private http: HttpClient) { }

  createPark(parkData: any): Observable<Park> {
    return this.http.post<Park>(this.baseUrl, parkData);
  }

  getParks(): Observable<Park[]> {
    return this.http.get<Park[]>(this.baseUrl);
  }

  getParkById(id: string): Observable<Park> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Park>(url);
  }

  updatePark(id: string, parkData: Park): Observable<Park> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Park>(url, parkData);
  }

  deletePark(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
