import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/users/edituser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    title = 'Finmae.com';
    oneuser: any;
    editUserForm: FormGroup;
    editUserData: any;
    changePass: boolean;
    changePasswordForm: FormGroup;
    changePasswordData: any;
    editProfileFail = false;
    imageFile: any;

    passwordFail = false;
    passwordMatchFail = false;
    oldpassword: any;
    newpassword: any;
    confirmnewpassword: any;
    id: any;
  constructor(private jwtService: JwtService,
              private authService: AuthService,
              private router: Router,
              private toasterService: ToasterService,
              private fb: FormBuilder, ) {
    this.editUserForm = fb.group({
      'firstname' : ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
      ])],
      'lastname' : ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10)
      ])],
      'email' : ['', Validators.compose([
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])],
      'gender' : ['', Validators.compose([

      ])],
      'jobtitle' : ['', Validators.compose([

      ])],
      'mobilenumber' : ['', Validators.compose([
          Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),

           Validators.required,
      ])],
      'state' : ['', Validators.compose([

          Validators.required,
      ])],
      'city' : ['', Validators.compose([

          Validators.required,
      ])],



    });

  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('newpassword').value === formGroup.get('confirmnewpassword').value
      ? null : { mismatch: true };
  }

  myprofile() {
    this.authService.getMyProfile().subscribe(
        res => {
        this.oneuser = res.data;
        console.log(this.oneuser);
        this.editUserForm.patchValue(this.oneuser);
        },
        err => {
        this.toasterService.showError(err.error.message, 'Error');
        console.log(err);
        }
    );
  }

  selectFile(event: any) {

        this.imageFile =  event.target.files[0] as File;
        console.log(this.imageFile, 'aaaaaa');

    }



    editUserSubmit() {
        this.editProfileFail = false;
        if (!this.editUserForm.valid) {
            this.editProfileFail = true;
            setTimeout(() => {
            this.editProfileFail = false;
            }, 8000);
        } else {


            this.editUserData = this.editUserForm.value;
            this.authService.editUser(this.editUserData).subscribe(
                (res) => {

                  // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
                  // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                  //      console.log('ImageUpload:uploaded:', item, status, response);
                  //      alert('File uploaded successfully');
                  //  };

                    this.toasterService.showSuccess(res.message, 'Success');
                   /// this.updateUserName(res['data']['firstname']);
                    this.editUserForm.reset();
                    // this.myprofile();
                    this.router.navigate(['/users/profile']);
                },
                (err) => {
                    this.toasterService.showError(err.error.message, 'Error');
                    console.log(err.error, 'errrrrrr');
                }
            );
        }

    }

  ngOnInit() {
    // this.myprofile();

    this.authService.getId().subscribe(res => {
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       console.log('ImageUpload:uploaded:', item, status, response);
      //  alert('File uploaded successfully');
   };

   this.editUserForm.patchValue(res);
  });
  }
}
