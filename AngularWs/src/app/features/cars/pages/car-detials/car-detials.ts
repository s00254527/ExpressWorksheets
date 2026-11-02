import { Component,inject,input,signal } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { Observable } from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-car-detials',
  imports: [],
  templateUrl: './car-detials.html',
  styleUrl: './car-detials.scss',
})
export class CarDetials {
  private carService = inject(CarService);

  readonly id = input.required<string>();
  readonly car = signal<Car  | null>(null);

  ngOnInit(): void {
    this.carService.getCardsById(Number(this.id())).subscribe(car =>{
      this.car.set(car[0] ?? null);
    });
  }
}
