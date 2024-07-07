import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/employee.interface';
import { IPeople } from '../interfaces/people.interface';
import { SelectedPeople } from '../components/people/people.component';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  root = 'http://localhost:3000';

  addNewEmployee(newEmployee: any): Observable<any> {
    return this.http.post<any>(this.root + '/employee', newEmployee);
  }

  signUpEmployee(newEmployee: any): Observable<any> {
    return this.http.post<any>(this.root + '/signup', newEmployee);
  }

  getAllEmployee(id: number): Observable<any> {
    console.log(id);
    return this.http.get<any>(this.root + '/employee/team_id/' + id);
  }

  updateEmployeeById(id: number | undefined, update: any): Observable<any> {
    return this.http.put<any>(this.root + '/employee/' + id, update);
  }
  updateEmployeeRoleByEmail(update: any): Observable<any> {
    return this.http.put<any>(this.root + '/employee', update);
  }

  getAllPeople(): Observable<IPeople[]> {
    return this.http.get<IPeople[]>(this.root + '/employee');
  }

  getOnePeople(id: number | undefined | string): Observable<SelectedPeople> {
    return this.http.get<SelectedPeople>(this.root + '/employee/' + id);
  }
  getTaskStatusById(id: number | undefined | string): Observable<any> {
    return this.http.get<any>(this.root + '/employee_stats/' + id);
  }
}
