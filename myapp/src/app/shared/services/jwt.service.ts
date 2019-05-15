import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  constructor(){
  }
  getToken() : string {
    return window.localStorage.getItem('jwtToken');
  }
  saveToken(token : string) {
    window.localStorage.setItem('jwtToken',token);
        
  }
  destroyToken(){
      window.localStorage.removeItem('jwtToken');
      localStorage.removeItem('username');
  }
  saveUsername(username : string){
      localStorage.setItem('username',username);
  }
  getUsername(){
      return localStorage.getItem('username');
  }
  saveJobtitle(jobtitle : string){
    localStorage.setItem('jobtitle',jobtitle);
}
  getJobtitle(){
    return localStorage.getItem('jobtitle');
  }
  
 

}
