import { Component,inject,input,signal } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { Observable,switchMap } from 'rxjs';
import { LoadState ,withLoadState} from '../../../../shared/load-state';
import { toObservable,toSignal } from '@angular/core/rxjs-interop';
import { RouterLink , Router} from '@angular/router';

@Component({
  selector: 'app-car-detials',
  imports: [RouterLink ],
  templateUrl: './car-detials.html',
  styleUrl: './car-detials.scss',
})
export class CarDetials {
  private carService = inject(CarService);
  private router = inject(Router);
  readonly id = input.required<string>();
  readonly initial: LoadState<Car> = { status: 'loading' };
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);


  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteCar(car:Car): void{
    if(!confirm(`Delete${car.make} ${car.model}?`)) return;
    this.deleting.set(true);
    this.deleteError.set(null);
    this.carService.deletecar(car._id!).subscribe({
      next:() => this.router.navigate(['/cars']),
      error: (error) => {
        this.deleteError.set(error.message);
        this.deleting.set(false);
      }
    });
  }

}
