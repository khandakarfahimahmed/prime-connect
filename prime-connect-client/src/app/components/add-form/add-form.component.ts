import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddFormService } from '../../services/add-form.service';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})
export class AddFormComponent implements OnInit{

  formName: string = '';
  fieldTableArray = [];
  dropdownList: { field_id: number; field_name: string }[] = [];
  selectedItems: { field_id: number; field_name: string }[] = [];
  dropdownSettings: any = {};
  dropDownForm!: FormGroup;
  validateForm!: FormGroup;
  pdfList: any[] = [];

  exist_field: string[] = [];
  filteredFieldList!: { [key: string]: string }[];
  
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  @Input() visible = false;
  @Input() isVisible = false;
  @Input() team_id!: number;
  @Input() role_id!: number | undefined;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private fieldApi: AddFormService) {}

  ngOnInit(): void {
    this.fieldApi.getAllField().subscribe((data) => {
      data.forEach(item => {
        this.dropdownList.push({field_id: item.id, field_name: item.field_name});
      })
    });
    this.fieldApi.getAllPdfByTeamId(this.team_id).subscribe((data) => {
      this.pdfList = data;
      console.log(this.pdfList)
    })
    this.dropdownSettings = {
      idField: 'field_id',
      textField: 'field_name',
    };

    this.selectedItems = this.dropdownList.slice(0, 2);

    this.dropDownForm = this.fb.group({
      myItems: [this.dropdownList]
    });

    this.validateForm = this.fb.group({});

    this.addField();
  }

  onItemSelect(item: any): void {
    console.log('Selected Item:', item);
  }

  open(): void {
    this.visible = true;
    this.isVisibleChange.emit(this.visible);
  }

  close(): void {
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }

  create(): void {
      const newForm = {
        name: this.formName,
        fields: this.filteredFieldList,
        team_id: this.team_id,
        role_id: this.role_id
      }
       this.fieldApi.addNewForm(newForm).subscribe(res => console.log(res));
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
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
      control.controlInstance + '_name',
      this.fb.control('', Validators.required)
    );

    this.validateForm.addControl(
      control.controlInstance + '_type',
      this.fb.control('', Validators.required)
    );

    this.validateForm.addControl(
      control.controlInstance + '_page',
      this.fb.control('', Validators.required)
    );

    this.validateForm.addControl(
      control.controlInstance + '_coordinateX',
      this.fb.control('', Validators.required)
    );
    this.validateForm.addControl(
      control.controlInstance + '_coordinateY',
      this.fb.control('', Validators.required)
    );

    this.validateForm.addControl(
      control.controlInstance + '_sequence',
      this.fb.control('', Validators.required)
    );

    this.validateForm.addControl(
      control.controlInstance + '_pdfId',
      this.fb.control('', Validators.required)
    );

    this.validateForm.addControl(
      control.controlInstance + '_estimatedTime',
      this.fb.control('', Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance + '_name');
      this.validateForm.removeControl(i.controlInstance + '_type');
      this.validateForm.removeControl(i.controlInstance + '_page');
      this.validateForm.removeControl(i.controlInstance + '_coordinateX');
      this.validateForm.removeControl(i.controlInstance + '_coordinateY');
      this.validateForm.removeControl(i.controlInstance + '_sequence');
      this.validateForm.removeControl(i.controlInstance + '_pdfId');
      this.validateForm.removeControl(i.controlInstance + '_estimatedTime');
    }
  }
  
  submitForm(): void {   
    const fieldList: { [key: string]: string }[] = [];
    if (this.validateForm.valid) {
      Object.keys(this.validateForm.value).forEach(key => {
        // Split the key to get the index and the field name
        const [index, fieldName] = key.split('_');
        const fieldValue = this.validateForm.value[key];
        // If fieldList[index] is undefined, create a new object for it
        if (!fieldList[parseInt(index)]) {
          fieldList[parseInt(index)] = {};
        }
        // Assign the value to the corresponding field in the object
        fieldList[parseInt(index)][fieldName] = fieldValue;
      });
  
      // Remove any undefined elements from fieldList
      this.filteredFieldList = fieldList.filter(item => Object.keys(item).length > 0);
      
      // console.log(this.formName);
      console.log(this.dropDownForm.value.myItems);
      // console.log('fieldList', this.filteredFieldList);
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
