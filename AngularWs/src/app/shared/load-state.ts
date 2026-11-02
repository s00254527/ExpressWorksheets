import { Observable, catchError, map, of, startWith } from 'rxjs';

//using 3 functions to create a load state for the data being fetched from the server.
export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'loaded'; data: T }
  | { status: 'error'; message: string };

// Wraps any observable so it emits loading, then loaded or error
export function withLoadState<T>(source: Observable<T>): Observable<LoadState<T>> {
  return source.pipe(
    //map changes each value that passes through the observable to a new value.
    map((data): LoadState<T> => ({ status: 'loaded', data })),
    //startWith emits a value before the source observable starts emitting values.
    startWith<LoadState<T>>({ status: 'loading' }),
    //catchError catches any errors that occur in the observable and returns a new observable with the error message.
    catchError((err: Error) => of<LoadState<T>>({ status: 'error', message: err.message })),
  );
}

