import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { JwtService } from '../../shared/services/jwt.service';
import { ToasterService } from '../../shared/services/toaster.service';
import {
  SocialAuthService,
  GoogleLoginProvider
} from 'ng-social';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  forgotForm: FormGroup;
  loginForm: FormGroup;
  isLoading = false;
  checked = false;
  loginFormSuccessful = false;
  laddaVal = true;
  forgotPass = true;
  forpassDone = false;
  fullName: any;
  name: string;
  display = false;
  firstName: string;
  lastName: string;
  userSocial_id: any;

  constructor(private fb: FormBuilder,
    private authService: AuthService, private router: Router,
    private dataService: DataService, private jwtService: JwtService,
    
    private toasterService: ToasterService,
  ) {
    this.loginForm = fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$')
      ]],
      'password': ['', [
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')
      ]]
    });
    this.forgotForm = fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$')
      ]]
    });

  }


  ngOnInit() {


  }

 

  onSubmit() {
    if (this.loginForm.valid) {
      this.laddaVal = true;
      this.isLoading = !this.isLoading;

      const user = {
        'email': this.loginForm.value.email,
        'password': this.loginForm.value.password
      };


      this.authService.logIn(user).subscribe(data => {

        console.log(data, "res from api");
        let test = data.data.isverified 
        console.log(test,"isverfied-------------------")
        if (!test) {
          this.loginFormSuccessful = true;
          this.loginForm.reset();
          this.laddaVal = false;
         // this.toasterService.showError('','Error');
          console.log('user not verified');
        } else {
          this.toasterService.showSuccess('login  successfully', 'Success');
          this.jwtService.saveToken(data.token);
          this.jwtService.saveUsername(data.data.firstname);
          this.jwtService.saveJobtitle(data.data.jobtitle);
         // this.toasterService.showSuccess('login  successfully', 'Success');
          this.router.navigate(['/users/home']);
         
        }
      },
        err => {
          this.laddaVal = false;
          this.toasterService.showError(err.error.message, 'Error');
          console.error(err);
        }
      );
    }


  }
  forgotPassword() {
    this.forgotPass = false;
  }
  loginAgain() {
    this.forgotPass = true;
  }

  onSubmit2() {
    if (this.forgotForm.valid) {
      console.log(this.forgotForm.value);
      this.authService.forPass(this.forgotForm.value).subscribe((res) => {
        //console.log("aasss"+this.forgotForm.value);
        this.forpassDone = true;

      }, (err) => { console.log(err); });

    }
  }


}
