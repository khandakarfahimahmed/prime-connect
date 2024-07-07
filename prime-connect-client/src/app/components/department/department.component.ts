import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDepartment } from '../../interfaces/department.interface';
import { DepartmentService } from '../../services/department.service';
import { IPeople } from '../../interfaces/people.interface';

@Component({
  selector: 'department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit{  

  showForm: boolean = false;
  deptList!: IDepartment[];
  isLoading: boolean = false;
  deptEmployees: { id: number | undefined, name: string, employees: IPeople[], activeEmployee: IPeople[] }[] = [];
  activeEmployees: IPeople[] = [];
  showAddForm: boolean = false;
  changeVisible(event: boolean) {
    this.showAddForm = event;
  }

  constructor( private deptApi: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.showLoader();

    this.deptApi.getAllDepartment().subscribe(data => {
      // .filter(dept => dept.name !== 'Super Admin')
      this.deptList = data.filter(dept => dept.name !== 'Super Admin'); 
      this.deptList.forEach((dept) => {
        this.deptApi.getAllEmployeeByDeptId(dept.id).subscribe(employees => {
          this.activeEmployees = employees.filter((employee: IPeople) => employee.active === true);
          this.deptEmployees.push({ id: dept.id, name: dept.name, employees, activeEmployee: this.activeEmployees });
        })
      })
    });

  }

  hideAddDepartmentForm(event: boolean | IDepartment) {
    if(typeof event === 'boolean') this.showForm = event;
    else {
        this.deptList.push(event);
          this.deptApi.getAllEmployeeByDeptId(event.id).subscribe(employees => {
            this.activeEmployees = employees.filter((employee: IPeople) => employee.active === true);
            this.deptEmployees.push({ id: event.id, name: event.name, employees, activeEmployee: this.activeEmployees });
          })

    }
  }

  showLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
   }

  deptClicked(id: number | undefined) {
    this.showLoader();
    this.router.navigate(['app-teams',id]);
  }

  addDept() {
    this.showAddForm = true;
  }

  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  }
}
