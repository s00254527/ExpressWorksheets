import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import {CreateCarDto } from '../../models/car.model';
import{ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm {
  //creating new formbuilder instance using inject function
private formbuilder = inject (FormBuilder);
private carService = inject(CarService);
private router = inject(Router);

carForm = this.formbuilder.nonNullable.group({
  make: ['',Validators.required],
  model: ['',Validators.required],
  year: this.formbuilder.control<number | null>(null)

});
onSubmit(): void {

  const { make, model, year } = this.carForm.getRawValue();
  const newCar: CreateCarDto = { make, model, year: year ?? undefined };
      
      console.log('Submitted Car:', newCar);

      this.carService.addCar(newCar).subscribe({
        next: (response) => {
          console.log('Car added successfully:', response);
          this.router.navigate(['/cars']); 
        },
        error: (error) => {
          console.error('Error adding car:', error);
        }
      });
    }
  }
