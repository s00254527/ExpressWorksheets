import { Routes } from '@angular/router';
import { CarList } from './features/cars/pages/car-list/car-list';
import { CarDetials } from './features/cars/pages/car-detials/car-detials';
import { CarForm } from './features/cars/pages/car-form/car-form';

export const routes: Routes = [
    {path:'', redirectTo: 'cars', pathMatch: 'full'},
    {path:'cars', component: CarList},
    {path:'cars/:id',component:CarDetials},
    {path:'cars/new',component:CarForm},
];
