import { Component,inject,OnInit,signal } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CreateCarDto } from '../../models/car.model';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatError} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { input } from '@angular/core';
import { error } from 'console';
@Component({
  selector: 'app-car-form',
  imports: [
     ReactiveFormsModule,
     CommonModule,
      FormsModule,
      RouterModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatProgressBarModule,
    MatError],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm implements OnInit {
  //creating new formbuilder instance using inject function
private formbuilder = inject (FormBuilder);
private carService = inject(CarService);
private router = inject(Router);
private snackBar = inject(MatSnackBar);
saving = signal(false);
saveError = signal<string | null>(null);
readonly id = input<string>();
private readonly currentYear = new Date().getFullYear();

carForm = this.formbuilder.nonNullable.group({
    make: ['',Validators.required,Validators.minLength(2),
          Validators.maxLength(30)],
    model: ['',Validators.required,Validators.maxLength(30)],
    year: this.formbuilder.control<number | null>(null, [Validators.min(1950),
          Validators.max(this.currentYear + 1),]),

});

  onSubmit(): void {
    const { make, model, year } = this.carForm.getRawValue();
    const newCar: CreateCarDto = { make, model, year: year ?? undefined };

    this.saving.set(true);
    this.saveError.set(null);
    this.carService.addCar(newCar).subscribe({
      next: (response) => {
        this.snackBar.open(`${newCar.make} ${newCar.model} added successfully!`, 'Close', 
          {duration:10000});
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
    error: (err: Error) => {
      this.saveError.set(err.message);
      this.saving.set(false);
    },
    });
  }

    ngOnInit(): void {
    const id = this.id();
    const request = id 
    ? this.carService.getCarById(id, newCar)
    if (!id) return; // adding a new car, nothing to load

    this.carService.getCarById(id).subscribe({
      next: (car) =>
        this.carForm.patchValue(
          { 
            make: car.make,
             model: car.model,
              year: car.year ?? null
           }),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }

}
