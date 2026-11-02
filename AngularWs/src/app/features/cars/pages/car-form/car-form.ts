import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Car } from '../../models/car.model';
import { Router } from '@angular/router';
import{ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

carForm = this.formbuilder.group({
  make: ['',Validators.required],
  model: ['',Validators.required],
  year: ['']

});
onSubmit(): void {
      const carData: Car = this.carForm.value as Car;
      console.log('Submitted Car:', carData);
      
      this.CarService.addCar(carData).subscribe({
        next: (response) => {
          console.log('Car added successfully:', response);
          this.router.navigate(['/cars']);
        },
        error: (error) => {
          console.error('Error adding car:', error);
        }
      });
    }

  private router = inject(Router);
  private CarService = inject(CarService);  
}