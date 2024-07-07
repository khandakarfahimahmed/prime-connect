import { Component,EventEmitter,OnInit, Output,Input } from '@angular/core';
import { TeamApiService } from '../../services/team-api.service';
import { ITeam } from '../../interfaces/team.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'workflow1',
  templateUrl: './workflow1.component.html',
  styleUrl: './workflow1.component.css'
})
export class Workflow1Component {
    teams: ITeam[] = [];
    isLoading: boolean = false;
  
    constructor(private teamApi: TeamApiService, private router: Router) { }
  
    ngOnInit(): void {
      this.showLoader();
      this.teamApi.getAllTeam().subscribe({
        next: data => {
          this.teams = data.sort((a,b) => a.id - b.id ).filter(team => team.name !== 'Super Admin');
          // console.log(data);
        },
        error: err => {
          console.error(err);
        }
      })
    }
  
    showLoader() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2500);
     }
    teamClicked(i: number) {
      this.router.navigate(['workflow2',i]);
    }
  }
  

