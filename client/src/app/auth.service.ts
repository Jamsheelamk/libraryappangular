import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //  private _registerUrl = "http://localhost:3000/register";
   
  //  private _loginUrl    =    "http://localhost:3000/login";
server_address: string = 'api';
  
  constructor(private http: HttpClient, private _router: Router) { }
  
  registerUser(user:any){
  //  return this.http.post<any>(this._registerUrl,user)
  return this.http.post<any>(`${this.server_address}/register`,user)
  }
  loginUser(user:any){
  //  return this.http.post<any>(this._loginUrl,user)
  return this.http.post<any>(`${this.server_address}/login`,user)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
loggedInAdmin(){
  if(localStorage.getItem('token')=='admin'){
    return true;
}
  else{
    return false;
  }

}
loggedInUser(){
  if(localStorage.getItem('token')=='user'){
    return true;
}
  else{
    return false;
  }

}
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
