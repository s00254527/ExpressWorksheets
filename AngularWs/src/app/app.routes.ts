import { Routes } from '@angular/router';
import { CarList } from './features/cars/pages/car-list/car-list';
import { CarDetials } from './features/cars/pages/car-detials/car-detials';

export const routes: Routes = [
    {path:'', redirectTo: 'cars', pathMatch: 'full'},
    {path:'cars', component: CarList},
    {path:'cars/:id',component:CarDetials}
];
