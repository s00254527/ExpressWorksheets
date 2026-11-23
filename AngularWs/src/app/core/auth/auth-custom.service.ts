import { Injectable ,computed,inject,signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUserDto,User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthCustomService {
  //she wants to make this a read variable but she said shes going to leave it for now 

  private readonly apiUrl = 'http://localhost:3000/api/v1/register';

  private http = inject(HttpClient);

  //this is the add user method that is introduced.
  addUser(user:RegisterUserDto):Observable<User>{
    return this.http.post<User>(this.apiUrl,user);
  }

}
