import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/shared/services/jwt.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  
  oneuser: any;
  constructor(private jwtService : JwtService,
              private authService : AuthService,
              private router: Router,
              private toasterService : ToasterService,
              ){

  }

  myprofile() {
    this.authService.getMyProfile().subscribe(
    res => {
      this.oneuser = res['data'];
      console.log(this.oneuser);
    },
    err => {
      this.toasterService.showError(err.error.message,'Error');
      console.log(err);
    }
  );
  }


  ngOnInit() {
     this.myprofile();
  }

}
