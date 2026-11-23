import { Injectable ,computed,inject,signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map,tap } from 'rxjs';
import { LoginUserDto,RegisterUserDto,User } from '../models/user';
import { Router } from '@angular/router';

interface AuthResponse{
  token:string;
  user:string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthCustomService {
  //she wants to make this a read variable but she said shes going to leave it for now 

  private readonly apiUrl = 'http://localhost:3000/api/v1/register';

  //private writeable state only for this service can change it. 
  private http = inject(HttpClient);
  private router = inject(Router);

  //public read only for state components to use 
  private readonly _token = signal<string | null>(null);
  private readonly _currentUser = signal<string |null>(null);

  //public read only state for componets to use 
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._token() !== null);

  //creating an expirary time for this token
  private expieryTimer?:ReturnType<typeof setTimeout>;

  //getting the token stored 
  get token():string | null{
    return this._token();
  }


  //this is the add user method that is introduced.
  addUser(user:RegisterUserDto):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/register`,user);
  }

  login(userCridentials:LoginUserDto):Observable<User>{
    return this.http
    .post<AuthResponse>(`${this.apiUrl}/login`,userCridentials)
    .pipe(
      tap(res =>{
        //the response is the timer and starts the expiery timer
        this._token.set(res.token);
        this._currentUser.set(res.user);
        this.startExpiryTimer(res.token);
      }),
      map(res=>res.user)
    );
  }
  //this is the logout method for users as it takes them to the login
  //page a resets the timer. 
  logout():void{
    clearTimeout(this.expieryTimer);
    this._token.set(null);
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }


  private startExpiryTimer(token:string):void{
    const base64 = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
    const payload = JSON.parse(atob(base64));
    const msLeft = payload.exp * 1000 - Date.now();

    clearTimeout(this.expieryTimer);
    this.expieryTimer = setTimeout(()=> this.logout(),msLeft);
  }
}
