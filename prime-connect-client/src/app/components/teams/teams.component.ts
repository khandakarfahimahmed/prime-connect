import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute,NavigationEnd, Router } from '@angular/router';
import {  filter } from 'rxjs/operators';
import { TeamApiService } from '../../services/team-api.service';
import { ITeam } from '../../interfaces/team.interface';
import { IPeople } from '../../interfaces/people.interface';
import { EmployeeService } from '../../services/employee.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent implements OnInit{
  teams: ITeam[] = [];
  employee: any[] = [];
  roles: any[] = [];
  team_id!: number;
  teamName: string = '';
  deptId!: number;
  currentRoute: string = '';
  teamEmployees: {
    id: number | undefined;
    name: string;
    employees: IPeople[];
    activeEmployee: IPeople[];
  }[] = [];
  activeEmployees: IPeople[] = [];
  showAddForm: boolean = false;
  isLoading: boolean = false;

  changeVisible(event: boolean | ITeam) {
   if(typeof event == "boolean") this.showAddForm = event;
   else {
    this.teams.push(event);

    this.teamApi.getAllEmployeeByTeamId(event.id).subscribe((res) => {
      // console.log('response: ', res);
      const employees = res.employees;
      // console.log(employees);
      this.activeEmployees = employees.filter(
        (employee: IPeople) => employee.active === true
      );
      this.teamEmployees.push({
        id: event.id,
        name: event.name,
        employees,
        activeEmployee: this.activeEmployees,
      });
    });
   }
  }

  showLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
   }

  @Output() addTeamEvent = new EventEmitter<boolean>();
  @Output() addLoader = new EventEmitter<boolean>();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private teamApi: TeamApiService,
    private employeeApi: EmployeeService,
    private sharedService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.addLoader.emit();
    this.showLoader();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
       this.currentRoute = this.router.url;
      //  console.log(this.currentRoute);
    });

    this.route.params.subscribe((params) => {
      this.deptId = params['id'];
      console.log(this.deptId);
    });

    if (this.deptId === undefined) {
      this.teamApi.getAllTeam().subscribe({
        next: (data) => {
          this.teams = data
            .sort((a, b) => a.id - b.id)
            .filter((team) => team.name !== 'Super Admin');

          this.teams.forEach((team) => {
            this.teamApi
              .getAllEmployeeByTeamId(team.id)
              .subscribe((employees) => {
                this.activeEmployees = employees.filter(
                  (employee: IPeople) => employee.active === true
                );
                this.teamEmployees.push({
                  id: team.id,
                  name: team.name,
                  employees,
                  activeEmployee: this.activeEmployees,
                });
              });
          });
          // console.log(this.teams);
          this.teamName = this.teams[0].name;
          this.employeeApi
            .getAllEmployee(this.teams[0].id)
            .subscribe((data) => {
              const { roles, employees } = data;
              this.employee = employees;
              this.roles = roles;
              this.sharedService.sendData(
                this.employee,
                this.roles,
                this.teamName,
                this.team_id
              );
            });
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.teamApi.getAllTeamByDeptId(this.deptId).subscribe({
        next: (data) => {
          this.teams = data
            .sort((a, b) => a.id - b.id)
            .filter((team) => team.name !== 'Super Admin');
          this.teams.forEach((team) => {
            // console.log(team.id);
            this.teamApi.getAllEmployeeByTeamId(team.id).subscribe((res) => {
              // console.log('response: ', res);
              const employees = res.employees;
              // console.log(employees);
              this.activeEmployees = employees.filter(
                (employee: IPeople) => employee.active === true
              );
              this.teamEmployees.push({
                id: team.id,
                name: team.name,
                employees,
                activeEmployee: this.activeEmployees,
              });
            });
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  showTeams(newTeam: any) {
    if (newTeam) this.teams.push(newTeam);
    // console.log(this.teams);
  }

  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  teamClicked(i: number) {
    this.teamName = this.teams[i].name;
    this.team_id = this.teams[i].id;
    // console.log(this.teamName);
    // this.addLoader.emit(this.teams[i].id);
    this.employeeApi.getAllEmployee(this.teams[i].id).subscribe((data) => {
      // console.log(data);
      const { roles, employees } = data;
      this.employee = employees;
      this.roles = roles;
      this.sharedService.sendData(this.employee, this.roles, this.teamName,this.team_id);
      // console.log(data);
    });
  }

  addTeam() {
    console.log(this.currentRoute);
     this.showAddForm = true;
   if(this.currentRoute.includes('teamroles')) this.addTeamEvent.emit(true);
  }
}
