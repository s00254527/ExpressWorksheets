import { Component,inject,input,signal } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { Observable,switchMap } from 'rxjs';
import { LoadState ,withLoadState} from '../../../../shared/load-state';
import { toObservable,toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-detials',
  imports: [RouterLink],
  templateUrl: './car-detials.html',
  styleUrl: './car-detials.scss',
})
export class CarDetials {
  private carService = inject(CarService);

  readonly id = input.required<string>();

  readonly initial: LoadState<Car> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

}
