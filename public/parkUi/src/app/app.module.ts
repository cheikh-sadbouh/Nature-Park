import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AnimalsComponent } from './animals/animals.component';
import { ParksComponent } from './parks/parks.component';
import { LoginComponent } from './login/login.component';
import { EditParkComponent } from './edit-park/edit-park.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { CreateParkComponent } from './create-park/create-park.component';
import { CreateAnimalComponent } from './create-animal/create-animal.component';
import { SignupComponent } from './signup/signup.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ApiInterceptor } from './api-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    AnimalsComponent,
    ParksComponent,
    LoginComponent,
    EditParkComponent,
    EditAnimalComponent,
    CreateParkComponent,
    CreateAnimalComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
