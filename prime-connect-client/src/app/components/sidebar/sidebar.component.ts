import { Component,Output,EventEmitter,OnInit } from '@angular/core';
import { ActivatedRoute,NavigationEnd, Router } from '@angular/router';
import {  filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  team: boolean = false;
  departmentBGColor!: boolean;
  teamBGColor!: boolean;
  workflowBGColor!: boolean;
  peopleBGColor!: boolean;
  sidebarDisabled!: boolean;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      // console.log(currentRoute);
      this.sidebarDisabled =  currentRoute.includes('employee-dashboard') ;
      // console.log(this.sidebarDisabled);
    });
  
  }

  @Output() dataEvent = new EventEmitter<boolean>();

  departmentClicked(){

      this.departmentBGColor = true;
      this.workflowBGColor = false;
      this.peopleBGColor = false;
      this.teamBGColor = false;
      this.router.navigateByUrl('department');
    
  }

  
  teamClicked(){

      this.teamBGColor = true;
      this.departmentBGColor = false;
      this.workflowBGColor = false;
      this.peopleBGColor = false;
      this.router.navigateByUrl('teamroles');

  }

  peopleClicked(){

      this.teamBGColor = false;
      this.departmentBGColor = false;
      this.workflowBGColor = false;
      this.peopleBGColor = true;
      this.router.navigate(['/people',2]);
 
  }

  workflowClicked(){


      this.teamBGColor = false;
      this.departmentBGColor = false;
      this.workflowBGColor = true;
      this.peopleBGColor = false;
      // console.log(this.sidebarDisabled);
      this.router.navigate(['workflow2',2]);

    // this.router.navigateByUrl('workflow1');
  }

  logoClicked(){
    
    this.teamBGColor = false;
    this.departmentBGColor = false;
    this.workflowBGColor = false;
    this.peopleBGColor = false;
    if(!this.sidebarDisabled) this.router.navigateByUrl('admin-dashboard');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
