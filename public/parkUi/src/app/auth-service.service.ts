import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _jwt : JwtHelperService,private _userService:UserService) { }

  
  public get islogging() : boolean {
    if (null === localStorage.getItem("token")) {
      return false
    }else{
      return true
    }
  }
  
  public get name() : string {
    const token =this.token
     return this._jwt.decodeToken(token).name as string
    
  }
  
  public get token() : string {
    return localStorage.getItem("token") as string
  }
  public set token(token:string)  {
   localStorage.setItem("token",token)
  }
  
  
  signup(user:User){
  return  this._userService.singup(user);

  }

  login(user:User){
   return this._userService.login(user);

  }
  
  logout(){

    localStorage.clear()

  }
}
