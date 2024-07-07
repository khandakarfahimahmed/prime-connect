import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITeam } from '../interfaces/team.interface';
import { IPeople } from '../interfaces/people.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamApiService {

  root = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  getAllTeam () : Observable<ITeam[]> {
    return this.http.get<ITeam[]>(this.root + '/team');
  }

  getAllTeamByDeptId (id: number) : Observable<ITeam[]> {
    return this.http.get<ITeam[]>(this.root + '/team/'+id);
  }

  getAllEmployeeByTeamId (id: number) : Observable<any> {
    return this.http.get<any[]>(this.root + '/employee/team/'+id);
  }
  

  
  addTeam(newTeam:any): Observable<ITeam>{
    return this.http.post<ITeam>(this.root+'/team',newTeam);
  }
}
