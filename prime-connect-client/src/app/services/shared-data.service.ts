import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  constructor() { }

  sendData(employees: any,roles: any[],name: string,team_id: number) {
    const teamEmployee:{} = {employees,roles,name,team_id};
    console.log(teamEmployee);
    this.dataSubject.next(teamEmployee);
  }

}
