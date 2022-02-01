import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  
  adminloggedIn(){
    var sessionvalue = localStorage.getItem('session');
    if(sessionvalue==='adminsession')
    {
      return true
    }
    else{
      return false
    }
  }
  userloggedIn(){
    var sessionvalue = localStorage.getItem('token');
    if(sessionvalue==='usersession')
    {
      return true
    }
    else{
      return false
    }
  }
}
