import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDepartment } from '../interfaces/department.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  root = 'http://localhost:3000';

 getAllDepartment(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(this.root+'/department');
  }

  addNewDepartment(dept: IDepartment): Observable<IDepartment> {
    return this.http.post<IDepartment>(this.root + '/department', dept);
  }

  getAllEmployeeByDeptId(id: number | undefined): Observable<any> {
    return this.http.get<any>(this.root + '/department/'+id+'/employee');
  }
}
