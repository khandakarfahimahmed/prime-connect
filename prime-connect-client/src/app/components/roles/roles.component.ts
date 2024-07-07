import { Component,OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { SharedDataService } from '../../services/shared-data.service';
import { EmployeeService } from '../../services/employee.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IRole } from '../../interfaces/role.interface';

interface DataItem {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  active?: boolean;
  admin?: boolean;
  role_id?: number;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  listOfData: DataItem[] = [  ];
  selectedTeam: string = '';
  teamEmployee: [] = [];
  teamAdmin!: any;
  teamAdminRole!: any;
  roleName: string[] = [];
  roleId: number[] = [];
  roles: any[] = [];
  selectedRoleClass!: string;
  addRoleForm!: boolean;
  teamId!: number;
  showAddForm: boolean = false;
  changeVisible(event: boolean) {
    this.showAddForm = event;
  }
showRoleAddForm(){
  this.showAddForm = true;
}
  hideAddRoleForm(event: boolean | IRole){
    if(typeof event === 'boolean') this.addRoleForm = event;
    else {
      this.roles.push(event);
      this.roleName.push(event.name);     
    }
  }

  constructor( private sharedService: SharedDataService, private employeeApi: EmployeeService, private fb: FormBuilder) {
    this.selectedRoleClass = 'reviewer';
   }

  ngOnInit(): void {
    this.sharedService.data$.subscribe(data => {
      this.selectedTeam = data.name;
      this.teamId = data.team_id;
      console.log(this.teamId);
      console.log(data);
      // console.log(this.selectedTeam);
      this.teamEmployee = this.listOfData = data.employees;
      this.roles = data.roles;
      this.roleId = [];
      this.roleName = [];
      this.addRoleForm = false;
      // console.log(this.teamEmployee);
      this.teamAdmin = this.teamEmployee.find((employee:any) => employee.admin === "TA");
      
      if(this.teamAdmin){       
      this.teamId = this.teamAdmin.team_id;
      this.roles.forEach((role:any) =>{
        this.roleName.push(role.name);
        this.roleId.push(role.id);
        if(role.id == this.teamAdmin.role_id){
          this.teamAdminRole = role.name;
        }
      })
      }
      else {
        this.teamAdminRole = '';
      }
    });

    // add new admin form 
    this.teamAdminForm = this.fb.group({
      // id: new FormControl('', [Validators.required]),
      email: new FormControl('',  Validators.email),
    })
  }

  selectedRole!: string;

  onRoleChange(event: any, id:number | undefined) {
    this.selectedRole = event.target.value;
    const role_id = this.roles.find((role:any) => this.selectedRole === role.name).id;
    // console.log(id,role_id);
    this.employeeApi.updateEmployeeById(id,{role_id}).subscribe(res => {
      this.listOfData.forEach((employee:any) => {
        if(employee.id === res.id){
          employee.role_id = res.role_id;
        }
      })  
    })
  }


  clickedAdminChange: boolean = false;
  teamAdminForm!: FormGroup;

  changeAdmin(){
    this.clickedAdminChange = false;
    let { id,email } = this.teamAdminForm.value;
    id = Number(id);
    if(this.teamAdminForm.valid && typeof email !== undefined && email !== ''){
      this.employeeApi.updateEmployeeById(this.teamAdmin.id,{ admin : "none" }).subscribe();
      this.employeeApi.updateEmployeeRoleByEmail({email,admin:"TA"}).subscribe( res => {
        this.teamAdmin = res;
        this.roles.forEach((role:any) =>{
          if(role.id === this.teamAdmin.role_id){
            this.teamAdminRole = role.name;
          }
        })

        // console.log(this.teamAdmin.name,this.teamAdminRole);
      } );
    }
    this.teamAdminForm.reset();
  }


  listOfColumns: ColumnItem[] = [
    {
      name: 'Employee Id',
      sortOrder: 'ascend',
      sortFn: (a: DataItem, b: DataItem) => a.id - b.id,
      sortDirections: ['ascend', null],
      filterMultiple: true,
      listOfFilter: [
      ],
      filterFn: null
    },
    {
      name: 'Employee Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1),
      filterMultiple: true
    },
    {
      name: 'Employee Email',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: (email: string, item: DataItem) => item.email.indexOf(email) !== -1
    },
    {
      name: 'Choose Team Role',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.role.localeCompare(b.role),
      listOfFilter: [{
        text: 'admin',
        value: 'admin'
      },
      {
        text: 'Reviewer',
        value: 'Reviewer'
      },
      {
        text: 'Maker',
        value: 'Maker'
      },
      {
        text: 'Checker',
        value: 'Checker'
      }],
      filterFn: (role: string, item: DataItem) => item.role.indexOf(role) !== -1,
      filterMultiple: true,
      sortDirections: ['ascend', 'descend', null]
    }
  ];

}
