import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassesTeachersComponent } from './classes/classes-teachers.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
    {path:'', component:HomeComponent, pathMatch: 'full'},
    {path:'classes', component:ClassesComponent},
    {path:'classCourses/:id', component:ClassesTeachersComponent},
    {path:'login', component: LoginComponent}
];
