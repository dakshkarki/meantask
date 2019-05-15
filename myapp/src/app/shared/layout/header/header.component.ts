import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  //   this.jwtService.subscribe(userName => {
  //     this.username = username;
  //   });
  // this.jwtService.getToken().subscribe(res => {
  //     this.myToken = res;
  // });

  }

}
