import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddFormService } from '../../services/add-form.service';
import { DepartmentService } from '../../services/department.service';
import { TeamApiService } from '../../services/team-api.service';
import { ITeam } from '../../interfaces/team.interface';

@Component({
  selector: 'add-team',
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css',
})
export class AddTeamComponent implements OnInit {

  
  teamName: string = '';
  description: string = '';
  department: string = '';
  dropdownList: { pdf_id: number; pdf_name: string }[] = [];
  dropdownSettings: any = {};
  dropDownForm!: FormGroup;
  validateForm!: FormGroup;
  pdfList: any[] = [];
  newPdfList: { [key: string]: string }[] = [];
  filteredPdfList!: { [key: string]: string }[];
  deptList: any[] = [];
  
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  @Input() visible = false;
  @Output() isVisibleChange = new EventEmitter<boolean | ITeam>();

  constructor(private fb: FormBuilder, private message: NzMessageService, private teamApi: TeamApiService, private deptApi: DepartmentService, private fieldApi: AddFormService) {}

  ngOnInit(): void {
    this.fieldApi.getAllPdf().subscribe((data) => {
        data.forEach(item => {
        this.dropdownList.push({pdf_id: item.id, pdf_name: item.pdf_name});
      })
    })
    this.dropdownSettings = {
      idField: 'pdf_id',
      textField: 'pdf_name',
    };

    this.deptApi.getAllDepartment().subscribe((data) => {
      this.deptList = data.filter((item) => item.name !== "Super Admin");
    })
     this.dropDownForm = this.fb.group({
      myItems: []
    });

    this.validateForm = this.fb.group({});

    this.addField();
  }

  onItemSelect(item: any): void {
    // console.log('Selected Item:', item);
  }

  open(): void {
    this.visible = true;
    this.isVisibleChange.emit(this.visible);
  }

  close(): void {
    this.createPopupMessage('info', "Add Team Cancelled");
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }

  create(): void {
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
      const newTeam = {
        name: this.teamName,
        dept_id: this.department,
        description: this.description,
        exist_pdf: this.filteredPdfList,
        new_pdf: this.newPdfList
      }
      console.log(newTeam);
    this.teamApi.addTeam(newTeam).subscribe({
      next: data => {
        if(data) {
          this.createPopupMessage('success', "Team is added successfully");
          this.isVisibleChange.emit(data);
        }
      },
      error: err => {
        this.createPopupMessage('error', "Team is not added");   
        console.error(err);
      }
      // console.log(data);
    })

  }

  createPopupMessage( type: string, message: string): void {
    this.message.create(type, message, { nzDuration: 2000, nzPauseOnHover: true });
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }

    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `${id}`
    };
    this.listOfControl.push(control);

    this.validateForm.addControl(
      control.controlInstance + '-pdf_name',
      this.fb.control('', Validators.required)
    );

    this.validateForm.addControl(
      control.controlInstance + '-pdf_type',
      this.fb.control('', Validators.required)
    );

  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance + '-pdf_name');
      this.validateForm.removeControl(i.controlInstance + '-pdf_type');
    }
  }
  
  submitForm(): void {   
    const fieldList: { [key: string]: string }[] = [];
    if (this.validateForm.valid) {
      Object.keys(this.validateForm.value).forEach(key => {
        // Split the key to get the index and the field name
        const [index, fieldName] = key.split('-');
        const fieldValue = this.validateForm.value[key];
        // console.log("fieldValue", fieldValue);
        // If fieldList[index] is undefined, create a new object for it
        if (!fieldList[parseInt(index)]) {
          fieldList[parseInt(index)] = {};
        }
        // Assign the value to the corresponding field in the object
        fieldList[parseInt(index)][fieldName] = fieldValue;
      });
  
      // Remove any undefined elements from fieldList
      this.newPdfList = fieldList.filter(item => Object.keys(item).length > 0);
      this.filteredPdfList = this.dropDownForm.value.myItems;
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
