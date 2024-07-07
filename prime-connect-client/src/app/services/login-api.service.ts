import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  constructor(private http: HttpClient) { }

  root = 'http://localhost:3000';

  login (email: string, password: string) : Observable<any> {
    return this.http.post<any>(this.root + '/signin', { email, password });
  }

}
