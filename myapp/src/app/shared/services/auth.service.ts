import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<any>(0);
  public mysubject = this.subject.asObservable();



  getId(): Observable<any> {
    return this.subject.asObservable();
  }

  sendId(data) {
    this.subject.next(data);
  }

  socialLogin(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  uri = 'http://localhost:3000/api/';
  token: any;

  constructor(private http: HttpClient, private Jwtservice: JwtService) { }
  gethttpOptions() {
    let token = this.Jwtservice.getToken();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    };
    return httpOptions;
  }
  signUp(user): Observable<any> {
    return this.http.post(`${this.uri}users/signup`, user, httpOptions);
  }
  logIn(user): Observable<any> {
    return this.http.post(`${this.uri}users/signin`, user, httpOptions);
  }
  isAuthenticated() {
    this.token = window.localStorage.getItem('jwtToken');
    return this.token != null;
  }
  forPass(user): Observable<any> {
    return this.http.post(`${this.uri}users/forgotpassword`, user, httpOptions);
  }
  testAuth(user): Observable<any> {
    return this.http.post(`${this.uri}users/forpasskey`, user, httpOptions);
  }
  newPass(user): Observable<any> {
    return this.http.post(`${this.uri}users/newpass`, user, httpOptions);
  }
  socialcontrol(user): Observable<any> {
    return this.http.post(`${this.uri}users/socialcontrol`, user, httpOptions);
  }
  userRole(user): Observable<any> {
    return this.http.post(`${this.uri}users/socialRole`, user, httpOptions);
  }
  resendEmail(user): Observable<any> {
    return this.http.post(`${this.uri}users/resendemail`, user, httpOptions);
  }
  setPassword(paramsValue: Object): Observable<any> {
    return this.http.post(`${this.uri}users/setpassword`, paramsValue);
  }
  setNewPasswordRequest(setNewPassword: Object): Observable<any> {
    return this.http.post(`${this.uri}users/postsetpassword`, setNewPassword);
  }

  findAllUser(): Observable<any> {
    const httpOptions = this.gethttpOptions();
    return this.http.get(`${this.uri}users/findAllUser`, httpOptions);
  }
  getMyProfile(): Observable<any> {
    const httpOptions = this.gethttpOptions();
    return this.http.get(`${this.uri}users/myprofile`, httpOptions);
  }
  editUser(editUser: Object): Observable<any> {
    let httpOptions = this.gethttpOptions();
    return this.http.post(`${this.uri}users/edituser`, editUser, httpOptions);
  }
  deleteUser(_id): Observable<any> {
    console.log("id api", _id);
    //let httpOptions = this.gethttpOptions();
    return this.http.delete(`${this.uri}users/deleteUser?id=${_id}`);
  }
 
}
