import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ToastrModule } from 'ngx-toastr';
//import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
//import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/services/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LaddaModule } from 'angular2-ladda';
import { NgSocialModule, AuthServiceConfig, GoogleLoginProvider } from 'ng-social';
//import { FileSelectDirective } from 'ng2-file-upload';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('396903362257-a26b625viqetuevqkdhkcv5p8fku4o09.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
// FileSelectDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    BrowserAnimationsModule,
    LaddaModule
  ],
  exports: [
    RouterModule
],
providers: [AuthService, AuthGuard , {
  provide: AuthServiceConfig,
  useFactory: getAuthServiceConfigs
}, ],
  bootstrap: [AppComponent]
})





export class AppModule { }


