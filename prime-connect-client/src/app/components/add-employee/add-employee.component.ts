import { Component,EventEmitter, Output,Input } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { IPeople } from '../../interfaces/people.interface';
import { ITeam } from '../../interfaces/team.interface';
import { IRole } from '../../interfaces/role.interface';
import { IDepartment } from '../../interfaces/department.interface';
import { TeamApiService } from '../../services/team-api.service';
import { RoleService } from '../../services/role.service';
import { DepartmentService } from '../../services/department.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {  
    addNewEmployee!: FormGroup;
    teams!: ITeam[];
    roles!: IRole[];
    passwordVisible = false;
    departments!: IDepartment[];
    @Input() visible = false;
    @Output() isVisibleChange = new EventEmitter<boolean>();
    @Output() addEmployeeEvent = new EventEmitter<boolean | IPeople>();
  
    constructor(private fb: FormBuilder,private message: NzMessageService, private deptService: DepartmentService, private employeeApi: EmployeeService, private teamApi: TeamApiService, private roleApi: RoleService) {}
  
    ngOnInit(): void {
      this.addNewEmployee = this.fb.group({
        name: this.fb.control('',[Validators.required]),
        age: this.fb.control('',[Validators.required]),
        email: this.fb.control('',[Validators.required, Validators.email]),
        password: this.fb.control('',[Validators.required,Validators.minLength(4)]),
        phone: this.fb.control('',[Validators.required]),
        admin: this.fb.control('',[Validators.required]),
        dept: this.fb.control('',[Validators.required]),
        team: this.fb.control('',[Validators.required]),
        role: this.fb.control('',[Validators.required]),
        active: this.fb.control('true'),
      })

      this.deptService.getAllDepartment().subscribe(res => {
        this.departments = res;
      })
    }
  
    deptSelect(event : any) {
      const dept_id = event.value;
      this.teamApi.getAllTeamByDeptId(dept_id).subscribe(data => {
        this.teams = data;
      })
    }

    teamSelect(event : any) {
      const team_id = event.value;
      this.roleApi.getAllRole(team_id).subscribe(data => {
        this.roles = data.roles;
      })
    }

    close(): void {
      this.createPopupMessage('info', "Add Employee Cancelled");
      this.ngOnInit();
      this.addNewEmployee.reset();
      this.visible = false;
      this.isVisibleChange.emit(this.visible);
    }
    create(): void {
      this.visible = false;
      this.isVisibleChange.emit(this.visible);
    }

    onAddEmployee(){   
      this.addEmployeeEvent.emit(false);
      const { name,age,email,phone,admin,team,role,active,password } = this.addNewEmployee.value;
      const employee = { name,age,email,phone,admin,team_id: team,role_id: role,active,profile_pic: 'https://res.cloudinary.com/dr3buczbc/image/upload/v1714827398/img_20240504_185253987_720_bmhxzm.jpg'};
      // console.log(employee);
     
      this.employeeApi.addNewEmployee(employee).subscribe( {
        next: res => {
          if(res) {
            this.createPopupMessage('success', "Employee Added Successfully");
            this.employeeApi.signUpEmployee({email,password,employee_id: res.id}).subscribe({
              next: res => {
                if(res) this.createPopupMessage('success', "Employee Signup Successfully");
                else this.createPopupMessage('error', "Employee is not signed up");
              }
          })
          this.addEmployeeEvent.emit(res);
          }       
        },
        error: err => {
          this.createPopupMessage('error', "Employee Not Added");   
          console.error(err);
        }
       
        // this.roles.push(res);
      });
      this.addNewEmployee.reset();
    }

    createBasicMessage(type: string): void {
      this.message.success('This is a prompt message for success, and it will disappear in 10 seconds', {
        nzDuration: 2000, nzPauseOnHover: true
      });

      this.message.loading('Action in progress', { nzDuration: 2000 }).onClose!.subscribe(() => {
        // console.log('loading complete');
      });

      this.message.create(type, `This is a message of ${type}`);

      this.message.error('This is an error message', { nzDuration: 2000 });
    }  

    createPopupMessage( type: string, message: string): void {
      this.message.create(type, message, { nzDuration: 2000, nzPauseOnHover: true });
    }

}
  
