import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  root = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  createWorkflow(workflow: any): Observable<any> {
    return this.http.post(this.root + '/workflow', workflow);
  }

  deleteWorkflow(team_id: number | undefined, role_id: number | undefined): Observable<any> {
    return this.http.delete<any>(this.root + '/workflow/' + team_id + '/' + role_id);
  }

  getWorkflowByRoleId(role_id: number): Observable<any> {
    return this.http.get<any>(this.root + '/workflow/role_id/' + role_id);
  }
}
