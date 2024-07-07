import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  constructor(private http: HttpClient) {}
  root = 'http://localhost:3000';

  getActiveInfo(): Observable<any> {
    return this.http.get<any>(this.root + '/employee/active2/1');
  }
  getWorkStats(): Observable<any> {
    return this.http.get<any>(this.root + '/main-work-order/work-stats');
  }
}
