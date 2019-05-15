import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from '../shared/layout/header/header.component';
import { SidebarComponent } from '../shared/layout/sidebar/sidebar.component';
import { BreadcrumbComponent } from '../shared/layout/breadcrumb/breadcrumb.component';
//import { NgSocialModule, AuthServiceConfig, GoogleLoginProvider } from 'ng-social';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../shared/services/auth.guard';
import { LaddaModule } from 'angular2-ladda';
import { DataService } from '../shared/services/data.service';
import {KeyFilterModule} from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import {MessageService} from 'primeng/api';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ListprofileComponent } from './listprofile/listprofile.component';

import { FileSelectDirective } from 'ng2-file-upload';



export function getAuthServiceConfigs() {
  
}


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PasswordModule,
    TableModule,
    ToastModule,
    InputTextModule,
    CheckboxModule,
    RatingModule,
   // ScrollingModule,
    KeyFilterModule,
    DialogModule,
    SliderModule,
    PaginatorModule,
    SelectButtonModule,
    //NgSocialModule,
    ListboxModule,
    MultiSelectModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 30,
      spinnerColor: 'white',
      spinnerLines: 12,
    })
  ],
  declarations: [
    LoginComponent,
    FileSelectDirective,
    
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
    SignupComponent,
    //SafePipe,
    
   
    
    VerifyemailComponent,
    
    SetpasswordComponent,
    
    DashboardComponent,
    
    ProfileComponent,
    
    EditprofileComponent,
    
    ListprofileComponent,
    
    

  ],
  exports: [
    LoginComponent,
    
    
    SignupComponent
  ],
  providers: [MessageService,AuthService, AuthGuard, DataService]
})
export class UsersModule { }
