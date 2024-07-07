import { Component,EventEmitter,OnInit,OnChanges, Output,Input, SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddFormService } from '../../services/add-form.service';

// export interface IField {
//   '1': string[];
//   '2': string[];
//   '3': string[];
//   '4': string[];
// }

@Component({
  selector: 'create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent implements OnInit,OnChanges {

  addNewForm!: FormGroup;
  pdfs!: any;
  @Input() visible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() fieldImageInfo = new EventEmitter<string>();
  @Input() team_id!: number;
  @Input() fieldCoord!: number[];
  @Input() role_id!: number | undefined;
  currentPageIndex!: number;
  currentFieldIndex!: number;
  currentPdfIndex!: number;
  fieldTypes = ['text', 'number', 'password','date', 'email', 'url', 'checkbox', 'radio', 'select', 'textarea', 'file', 'image', 'pdf']


  constructor( private message: NzMessageService, private fb: FormBuilder, private formApi: AddFormService ) {} // private deptApi: DepartmentService

  ngOnInit(): void {

    this.formApi.getAllPdf().subscribe((data: any) => {
      this.pdfs = data;
    })

    this.addNewForm = this.fb.group({
      name: this.fb.control('',[Validators.required]),
      fields: this.fb.array([]) 
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultFormInfo']) {
      
      this.ngOnInit();
      // this.editClicked(this.editId);
  
    }
    if(changes['fieldCoord']) {
      // console.log(changes['fieldCoord'].currentValue);
      const [x,y] = changes['fieldCoord'].currentValue;
      this.getPagesFormArray(this.currentFieldIndex, this.currentPdfIndex).at(this.currentPageIndex).patchValue({co_ordinate: [x,y]});
    }
  }

  get fieldsFormArray() {
    return this.addNewForm.get('fields') as FormArray;
  }

  addField() {
    const field = this.fb.group({
      field_name: this.fb.control('',[Validators.required]),
      field_type: this.fb.control('',[Validators.required]),
      estimated_time: this.fb.control('',[Validators.required]),
      sequence: this.fb.control('',[Validators.required]),
      location: this.fb.array([]) 
    });
    this.fieldsFormArray.push(field);
  }

  removeField(index: number) {
    this.fieldsFormArray.removeAt(index);
  }

  getPdfsFormArray(fieldIndex: number) {
    return this.fieldsFormArray.at(fieldIndex).get('location') as FormArray;
  }

  addPdf(fieldIndex: number) {
    const pdf = this.fb.group({
      pdf_id: this.fb.control('',[Validators.required]),
      position: this.fb.array([])
    });
    this.getPdfsFormArray(fieldIndex).push(pdf);
  }

  removePdf(fieldIndex: number, pdfIndex: number) {
    this.getPdfsFormArray(fieldIndex).removeAt(pdfIndex);
  }

  getPagesFormArray(fieldIndex: number, pdfIndex: number) {
    return this.getPdfsFormArray(fieldIndex).at(pdfIndex).get('position') as FormArray;
  }

  addPage(fieldIndex: number, pdfIndex: number) {
    const position = this.fb.group({
      page: this.fb.control('',[Validators.required]),
      co_ordinate: this.fb.control([300,400],[Validators.required])
    });
    this.getPagesFormArray(fieldIndex, pdfIndex).push(position);
  }

  removePage(fieldIndex: number, pdfIndex: number, pageIndex: number) {
    this.getPagesFormArray(fieldIndex, pdfIndex).removeAt(pageIndex);
  }

  close(): void {
    this.createPopupMessage('info', "Add Form Cancelled");
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }
  create(): void {
    const {name,fields } = this.addNewForm.value;
    this.formApi.addNewForm({name,fields,team_id: this.team_id,role_id: this.role_id}).subscribe({
      next: res => {
        if(res) this.createPopupMessage('success', "Form Added Successfully");
        this.ngOnInit();
      },
      error: err => {
        this.createPopupMessage('error', "Form Not Added");  
        console.error(err);
      }
    });
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
    this.addNewForm.reset();
  }
  createPopupMessage( type: string, message: string): void {
    this.message.create(type, message, { nzDuration: 2000, nzPauseOnHover: true });
  }

  coordinateInput(event: any, fieldIndex: number, pdfIndex: number, pageIndex: number) {
    const {value} = event.target;
    const [x,y] = value.split(',');
    // console.log(x,y,fieldIndex, pdfIndex, pageIndex);
    // this.getPagesFormArray(fieldIndex, pdfIndex).at(pageIndex).patchValue({co_ordinate: [x,y]});
  }

  showFieldImage(event: any, fieldIndex: number, pdfIndex: number, pageIndex: number){
    this.currentFieldIndex = fieldIndex;
    this.currentPdfIndex = pdfIndex;
    this.currentPageIndex = pageIndex;
    const pdfId = ((this.fieldsFormArray.at(fieldIndex).get('location') as FormArray).value)[this.currentPdfIndex].pdf_id;
    const pageNo = ((this.fieldsFormArray.at(fieldIndex).get('location') as FormArray).value)[this.currentPdfIndex].position[this.currentPageIndex].page;
    const pdf = { '1': [ 'https://res.cloudinary.com/dr3buczbc/image/upload/v1716380910/images/image_1c29cf73e7ce80d6_1716380716995.png',
    'https://res.cloudinary.com/dr3buczbc/image/upload/v1716380911/images/image_0d9185cbe81bd43d_1716380720358.png',
    'https://res.cloudinary.com/dr3buczbc/image/upload/v1716380912/images/image_1fe486b77a51ea96_1716380721524.png',
    'https://res.cloudinary.com/dr3buczbc/image/upload/v1716380913/images/image_0b134fcf3e034ace_1716380722550.png',
    'https://res.cloudinary.com/dr3buczbc/image/upload/v1716380914/images/image_32c45aaf83e4a627_1716380723832.png',
    'https://res.cloudinary.com/dr3buczbc/image/upload/v1716380916/images/image_10b8cf2acf2c1efc_1716380724958.png'],
      '2': ["https://res.cloudinary.com/dr3buczbc/image/upload/v1715769167/images/image_c911d5c2b4919308_1715768986913.png"],
      '3': ["https://res.cloudinary.com/dr3buczbc/image/upload/v1715769167/images/image_af791f37adb8339c_1715768986923.png"],
      '4': ["https://res.cloudinary.com/dr3buczbc/image/upload/v1715769167/images/image_347c1689cfb7a1be_1715768986925.png"]
    };
    const index: keyof typeof pdf = pdfId.toString();
    this.fieldImageInfo.emit(pdf[index][pageNo-1]);
    // this.fieldImageInfo.emit('.../../assets/nid2.jpg');

  }
}
