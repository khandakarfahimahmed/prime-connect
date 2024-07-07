import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployeeDashboard } from '../interfaces/employee-dashboard';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDashboardService {
  workOrder: IEmployeeDashboard[] = [];
  constructor(private http: HttpClient) {}

  root = 'http://localhost:3000/';

  getAllById(id: number): Observable<IEmployeeDashboard[]> {
    return this.http.get<any>(
      this.root + 'distribute-work-order/employee/' + id
    );
  }
  getAllWorkById(id: number): Observable<any> {
    return this.http.get<any>(
      this.root + 'main-work-order/employee/' + id
    );
  }

  getEmployeeAccess(id: number): Observable<any> {
    return this.http.get<any>(this.root + '/employee/access/' + id);
  }
}
