import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { JwtService } from '../../shared/services/jwt.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})






@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css'],
})
export class SetpasswordComponent implements OnInit {
  paramValue: any;
  setPassword: Boolean = false;
  setNewPasswordForm: FormGroup;
  setNewPassword: any;
  setNewPasswordDetails: any;
  password: any;
  confirmpassword: any;
  passwordFail: boolean;
  passwordMatchFail: boolean;

  constructor(private authService: AuthService ,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toasterService: ToasterService,
              private fb: FormBuilder,
              private jwtService: JwtService,
            ) {
    this.setNewPasswordForm = fb.group({
      password : ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')
      ])],
      confirmpassword : ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')
      ])]
    });
  // }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmpassword').value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    this.passwordFail = false;
    this.passwordMatchFail = false;
    this.password = this.setNewPasswordForm.value.password;
    this.confirmpassword = this.setNewPasswordForm.value.confirmpassword;
    if(!this.setNewPasswordForm.valid){
      this.passwordFail = true;
      setTimeout(() => {
        this.passwordFail = false;
      },4000);
    }
    else if(this.password != this.confirmpassword){
      this.passwordMatchFail = true;
      setTimeout(() => {
        this.passwordMatchFail = false;
      },4000);
    }
    else{
      this.setNewPassword = this.setNewPasswordForm.value.password;
      this.setNewPasswordDetails = { email : this.paramValue.email , password : this.setNewPassword };
      // console.log(this.setNewPasswordDetails);
      this.authService.setNewPasswordRequest(this.setNewPasswordDetails).subscribe(
        setnewpassword => {
          console.log(setnewpassword, 'vvvvvvvv');
          this.toasterService.showSuccess('New password set successfully', 'Success');
          const userDetails = { data : setnewpassword , isLogin : true };
          this.jwtService.saveToken(setnewpassword.token);
          this.router.navigate(['/user']);
        },
        err => {
          this.toasterService.showError(err.error.error, 'Error');
        }
      );
      this.setNewPasswordForm.reset();
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.paramValue = params;
    });
    this.authService.setPassword(this.paramValue).subscribe(
      res => {
        if (res) {
          console.log(res);
          //this.toasterService.showSuccess(res.success, 'Success');
          this.setPassword = true;
        }
      },
      err => {
        this.toasterService.showError(err.error.message, 'Error');
      }
    );
  }

}
