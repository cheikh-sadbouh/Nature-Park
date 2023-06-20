import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user=  {} as User;
 constructor(private _auth:AuthService){}


 signUp(){
  this._auth.signup(this.user).subscribe({
    next:(user)=>console.log("registration done!"),
    error:(error)=>console.log(error)
    
  })
 }

}
