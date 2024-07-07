import { Component,EventEmitter, Output,Input,OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmployeeService } from '../../services/employee.service';
import { IPeople } from '../../interfaces/people.interface';
import { ITeam } from '../../interfaces/team.interface';
import { IRole } from '../../interfaces/role.interface';
import { IDepartment } from '../../interfaces/department.interface';
import { TeamApiService } from '../../services/team-api.service';
import { RoleService } from '../../services/role.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit,OnChanges{
  addNewEmployee!: FormGroup;
  teams!: ITeam[];
  roles!: IRole[];
  departments!: IDepartment[];
  editPeople!: any;
  passwordVisible = false;

  @Input() editId!: any;
  @Input() visible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() updateEmployeeEvent = new EventEmitter<IPeople>();

  constructor(private fb: FormBuilder, private message: NzMessageService, private deptService: DepartmentService, private employeeApi: EmployeeService, private teamApi: TeamApiService, private roleApi: RoleService) {}

  ngOnInit(): void {
    // console.log(this.editId);

    this.editClicked(this.editId);

    this.deptService.getAllDepartment().subscribe(res => {
      this.departments = res;
    })

  }

  
  ngOnChanges(changes: SimpleChanges) {
    // Check if the 'inputValue' property changed
    if (changes['editId']) {
      // console.log('Input value changed in child component:', this.editId);
      this.editClicked(this.editId);
      // Do something with the changed value
    }
  }

  editClicked(id: number | undefined) {
    // this.showLoader();
    // console.log(id);
    this.employeeApi.getOnePeople(id).subscribe((res: any) => {
      // console.log(res);
      this.editPeople = res.employee;
      this.addNewEmployee = this.fb.group({
        name: this.fb.control(this.editPeople.name,[Validators.required]),
        age: this.fb.control(this.editPeople.age,[Validators.required]),
        email: this.fb.control(this.editPeople.email,[Validators.required, Validators.email]),
        password: this.fb.control('',[Validators.required,Validators.minLength(4)]),
        phone: this.fb.control(this.editPeople.phone,[Validators.required]),
        admin: this.fb.control(this.editPeople.admin,[Validators.required]),
        dept: this.fb.control(res.department,[Validators.required]),
        team: this.fb.control(this.editPeople.team_id,[Validators.required]),
        role: this.fb.control(this.editPeople.role_id,[Validators.required]),
        active: this.fb.control('true'),
      })
    });
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
    // this.addNewEmployee.reset();
    this.createPopupMessage('info', "Employee update cancelled");
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }
  create(): void {
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }

  updateEmployee(){   
    this.isVisibleChange.emit(false);
    const { name,age,email,phone,admin,team,role,active,password } = this.addNewEmployee.value;
    const employee = { name,age,email,phone,admin,team_id: team,role_id: role,active };
    // console.log(employee);
    this.employeeApi.updateEmployeeById(this.editId,employee).subscribe( {
      next: res => {
        if(res) {
          this.createPopupMessage('success', "Employee Updated Successfully");
         if(password){
          this.employeeApi.signUpEmployee({email,password,employee_id: res.id}).subscribe(res =>{
            if(res) this.createPopupMessage('success', "Updated Employee Signup Successfully");
          })
        }
      this.updateEmployeeEvent.emit(res);
        }
      },
      error: err => {
        this.createPopupMessage('error', "Employee is not updated");
        console.error(err);
      }
    });
    this.addNewEmployee.reset();
  }

  createPopupMessage( type: string, message: string): void {
    this.message.create(type, message, { nzDuration: 2000, nzPauseOnHover: true });
  }

  cancelClicked(){
    this.isVisibleChange.emit(false);
  }
}
