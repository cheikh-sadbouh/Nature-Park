import { Component } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user=  {} as User;
 constructor(private _auth:AuthService, private router: Router){}


 login(){
  this._auth.login(this.user).subscribe({
    next:(data)=>{
      this._auth.token=data.token;
      console.log(this._auth.token);
      this.router.navigateByUrl('/nature-park');
    },
    error:(error)=>console.log(error)   
  })
 }
}
