import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { ToasterService } from '../../services/toaster.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
name: string;
jobtitle :string;
  constructor(private router: Router,private jwtService: JwtService, private toasterService: ToasterService,) { }

  ngOnInit() {
   this.name = localStorage.getItem('username');
   this.jobtitle  = localStorage.getItem('jobtitle');
  }
  // logout() {
  //   window.localStorage.removeItem('token');
  //   this.router.navigate(['']);
  // }
  destroyToken() {
    this.jwtService.destroyToken();
    
    // this.apiService.sendIsLoginValue(true);
    this.toasterService.showSuccess('You are now logged out', 'Logout success');
    this.router.navigate(['/']);
  }
}
