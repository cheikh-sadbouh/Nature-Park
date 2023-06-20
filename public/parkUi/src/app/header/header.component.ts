import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

 constructor(private _auth:AuthService){}
 ngOnInit(): void {
  this.isLoggedIn=  this._auth.islogging;
  
  }

  logout(){
    this._auth.logout();
  }
}
