import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Car } from '../../models/car.model';
import { Router } from '@angular/router';
import{ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm {
  //creating new formbuilder instance using inject function
private formbuilder = inject (FormBuilder);

carForm = this.formbuilder.group({
  make: ['',Validators.required],
  model: ['',Validators.required],
  year: ['']

});
onSubmit(){
  const carData :Car  = this.carForm.value as Car;
  console.log('Car Data:', carData);
}
}