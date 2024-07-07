import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddFormService {


  constructor(private http: HttpClient) { }

 
  root = 'http://localhost:3000';

 getAllField(): Observable<any[]> {
    return this.http.get<any>(this.root+'/field-table');
  }

  getFormByTeamRoleId(team_id: number, role_id: number | undefined): Observable<any> {
    return this.http.get<any>(this.root + `/form/${team_id}/${role_id}`);
  }

  addNewForm(form: any): Observable<any> {
    return this.http.post<any>(this.root + '/form', form);
  }

  getAllPdfByTeamId(team_id: number): Observable<any[]> {
    return this.http.get<any[]>(this.root + `/team/${team_id}/pdfs`);
  }

  getAllPdf(): Observable<any[]> {
    return this.http.get<any[]>(this.root + '/pdf');
  }

  getAllFormByTeamId(team_id: number): Observable<any[]> {
    return this.http.get<any>(this.root+`/form/${team_id}`);
  }

  updateForm(team_id: number, role_id: number, form: any): Observable<any> {
    return this.http.put<any>(this.root + `/form/${team_id}/${role_id}`, form);
  }
}
