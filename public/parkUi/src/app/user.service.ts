import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.BASE_URL+"/users" ;

  constructor(private http: HttpClient) { }

  singup(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  
  login(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl+"/login", user);
  }

}
