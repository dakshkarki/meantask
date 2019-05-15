import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown'
import { SelectButtonModule } from 'primeng/selectbutton';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  totalSongs: number;
  totalPlaylist: number;
  songsData: any;
  display = false;
  videoUrl: any;
  selectedType: any;
  page: number;
  types: SelectItem[];
  constructor(private dataservice: DataService, private router: Router,
    private messageService: MessageService) {
    this.selectedType = 1;
    this.types = [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 }
    ];
    console.log(this.selectedType, 'page');

  }
  ngOnInit() {
    // this.page = 1;
    // this.totalSongs = 0;
    // this.totalPlaylist = 0;
    // this.dataservice.getSongData().subscribe(res => {
    //   this.data = res;
    //   this.totalSongs = res.total;
    // });
    // this.dataservice.getSongs(this.data).subscribe(
    //   data => {
    //     this.songsData = data.docs;
    //     this.dataservice.sendSongData(data);
    //   });
    // this.dataservice.getPlaylist().subscribe(res2 => {
    //   this.totalPlaylist = res2.length;
    // });

  }
  
  }






