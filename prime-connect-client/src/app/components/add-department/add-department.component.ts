import { Component,EventEmitter,OnInit, Output,Input } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DepartmentService } from '../../services/department.service';
import { IDepartment } from '../../interfaces/department.interface';

@Component({
  selector: 'add-department',
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent {
  addNewDept!: FormGroup;
  @Input() visible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() addDepartmentEvent = new EventEmitter<boolean | IDepartment>();

  constructor(private fb: FormBuilder, private deptApi: DepartmentService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.addNewDept = this.fb.group({
      name: this.fb.control('',[Validators.required]),
      description: this.fb.control('',[Validators.required])
    })
  }

  close(): void {
    this.createPopupMessage('info', "Add Department Cancelled");
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }
  create(): void {
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }

  onAddDepartment(){   
    this.addDepartmentEvent.emit(false);
    const { name , description } = this.addNewDept.value;
    const dept = {name,description};
    // console.log(role);
    this.deptApi.addNewDepartment(dept).subscribe( {
      // console.log(res);
      next: res => {
        if(res) {
          this.createPopupMessage('success', "Department Added Successfully");
          this.addDepartmentEvent.emit(res);
        }
      },
        error: err => {
          this.createPopupMessage('error', "Department is not added");   
          console.error(err);
        }
    });
    this.addNewDept.reset();
  }

  createPopupMessage( type: string, message: string): void {
    this.message.create(type, message, { nzDuration: 2000, nzPauseOnHover: true });
  }

  cancelClicked(){
    this.createPopupMessage('info', "Add Department Cancelled");
    this.addDepartmentEvent.emit(false);
  }
}
