import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewerService {
  root = 'http://localhost:3000/';
  constructor( private http: HttpClient ) { }

  getWorkDetails(acc_id: number,team_id: number, customer_id: number ): Observable<any> {
    return this.http.get(this.root + 'main-work-order/work/' + acc_id + '/'+ team_id + '/' + customer_id);
  }

  updateWorkDetails(acc_id: number,team_id: number, customer_id: number): Observable<any> {
    return this.http.put(this.root + 'main-work-order/work/' + acc_id + '/'+ team_id + '/' + customer_id, {status: "Write"});
  }
}
