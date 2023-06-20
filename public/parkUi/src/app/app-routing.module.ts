import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AnimalsComponent } from './animals/animals.component';
import { LoginComponent } from './login/login.component';
import { EditParkComponent } from './edit-park/edit-park.component';
import { CreateParkComponent } from './create-park/create-park.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { CreateAnimalComponent } from './create-animal/create-animal.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path:'nature-park/:id/animals',
  component:AnimalsComponent
},{
  path:'auth/login',
  component:LoginComponent
},{
  path:'auth/signup',
  component:SignupComponent
}
,{
  path:'nature-park/edit-park/:id',
  component:EditParkComponent
},
{
  path:'nature-park/:parkId/animals/:animalId/update-animal',
  component:EditAnimalComponent
},
{
  path:'nature-park/:parkId/animals/create-animal',
  component:CreateAnimalComponent
},
{
  path:'nature-park/create-park',
  component:CreateParkComponent
},
{
  path:'nature-park',
  component:MainPageComponent
},
{
     path: '',
    redirectTo: 'nature-park',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
