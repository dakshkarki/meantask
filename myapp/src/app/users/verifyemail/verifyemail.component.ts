import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { JwtService } from '../../shared/services/jwt.service';
// import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'ng-social';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {

  resendEmailForm: FormGroup;
  inputted: any;
  submitted: boolean = false;
  resendEmailData: any;

  constructor(private authService :AuthService,
              private fb: FormBuilder,
              private toasterService : ToasterService,
               private jwtService : JwtService,
              private router: Router,
              // private socialAuthService: SocialAuthService,
              // private spinnerService: Ng4LoadingSpinnerService
            )
  {
    this.resendEmailForm = fb.group({
      email : ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ])]
    });
  }

  public get f() {
    return this.resendEmailForm.controls;
  }

  onSubmitResendEmail(){
    if(!this.inputted.email.valid){
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
      },4000);
      return;
    }
    else{
      this.resendEmailData = this.resendEmailForm.value;
      // console.log(this.forgotPasswordData,'    99999');
      this.authService.resendEmail(this.resendEmailData).subscribe(
        (res) => {
          document.getElementById('resendemail-modal').click();
          this.toasterService.showSuccess(res.message , 'Success');
        },
        (err) => {
         this.toasterService.showError(err['error']['message'],'Error');
        }
      );
      this.resendEmailForm.reset();
    }


  }

  scrollToTop(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
    this.inputted = this.resendEmailForm.controls;
    this.scrollToTop();
  }

}





