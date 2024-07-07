import { Component,EventEmitter,OnInit, Output,Input } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleService } from '../../services/role.service';
import { IRole } from '../../interfaces/role.interface';

@Component({
  selector: 'add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit{
  
  addNewRole!: FormGroup;
  @Output() addRoleEvent = new EventEmitter<boolean | IRole>();
  @Input() team_id!: number;
  @Input() visible : boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private roleApi: RoleService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.addNewRole = this.fb.group({
      roleName: this.fb.control('',[Validators.required]),
      description: this.fb.control('',[Validators.required]),
      access: this.fb.control('',[Validators.required]),
      sequence: this.fb.control('',[Validators.required]),
      isAuthor: this.fb.control('true'),
    })
  }

  onAddRole(){   
    this.addRoleEvent.emit(false);
    const { roleName,description,access,sequence,isAuthor } = this.addNewRole.value;
    const role = {name:roleName,description,access,sequence,isAuthor,team_id: this.team_id};
    // console.log(role);
    this.roleApi.addRole(role).subscribe({
      next: res => {
        if(res) {
          this.createPopupMessage('success', "Role is added successfully");
          this.addRoleEvent.emit(res);
        }
      },
      error: err => {
        this.createPopupMessage('error', "Role is not added");   
        console.error(err);
      }
    });
    this.addNewRole.reset();
  }

  createPopupMessage( type: string, message: string): void {
    this.message.create(type, message, { nzDuration: 2000, nzPauseOnHover: true });
  }

  close(): void {
    this.createPopupMessage('info', "Add Role Cancelled");
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }
  create(): void {
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }

  cancelClicked(){
    this.addRoleEvent.emit(false);
  }
}
