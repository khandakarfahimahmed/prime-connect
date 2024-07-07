import { Component,OnInit,OnChanges,Input,SimpleChanges,Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder,FormGroup,Validators,FormArray } from '@angular/forms';
import { AddFormService } from '../../services/add-form.service';
import { NzImageService } from 'ng-zorro-antd/image';
import { Coord } from 'ngx-image-zoom';

@Component({
  selector: 'update-workflow-form',
  templateUrl: './update-workflow-form.component.html',
  styleUrl: './update-workflow-form.component.css'
})
export class UpdateWorkflowFormComponent implements OnInit,OnChanges {

  updateForm!: FormGroup;
  pdfs!: any;
  @Input() visible = false;
  @Input() fieldCoord!: number[];
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() fieldImageInfo = new EventEmitter<any>();
  @Input() defaultFormInfo!: any;
  currentFieldIndex!: number;
  currentPdfIndex!: number;
  currentPageIndex!: number;
  fieldTypes = ['text', 'number', 'password','date', 'email', 'url', 'checkbox', 'radio', 'select', 'textarea', 'file', 'image', 'pdf'];

  constructor( private message: NzMessageService, private fb: FormBuilder, private formApi: AddFormService ) {}

 
    ngOnInit(): void {

      this.formApi.getAllPdf().subscribe((data: any) => {
        this.pdfs = data;
      })

      this.updateForm = this.fb.group({
        name: [this.defaultFormInfo.name, [Validators.required]],
        fields: this.fb.array([])
      });
    
      // Populate fields array with default values
      this.defaultFormInfo.fields.forEach((field: any) => {
        const fieldGroup = this.fb.group({
          field_name: [field.field_name, [Validators.required]],
          field_type: [field.field_type, [Validators.required]],
          estimated_time: [field.estimated_time, [Validators.required]],
          sequence: [field.FormField.sequence, [Validators.required]],
          location: this.fb.array([])
        });
    
        // Populate location array with default values
        field.FormField.location.forEach((pdf: any) => {
          const pdfGroup = this.fb.group({
            pdf_id: [pdf.pdf_id, [Validators.required]],
            position: this.fb.array([])
          });
    
          pdf.position.forEach((position: any) => {
            const positionGroup = this.fb.group({
              page: [position.page, [Validators.required]],
              co_ordinate: [position.co_ordinate, [Validators.required]]
            });
            (pdfGroup.get('position') as FormArray).push(positionGroup);
          });
    
          (fieldGroup.get('location') as FormArray).push(pdfGroup);
        });
    
        (this.updateForm.get('fields') as FormArray).push(fieldGroup);
      });
      this.visible = true;
    }
    


  ngOnChanges(changes: SimpleChanges) {   // Check if the 'inputValue' property changed
    if (changes['defaultFormInfo']) {
      // console.log('Input value changed in child component:', this.defaultFormInfo);
      
      this.ngOnInit();
      // this.editClicked(this.editId);
  
    }
    if(changes['fieldCoord']) {
      console.log(changes['fieldCoord'].currentValue);
      const [x,y] = changes['fieldCoord'].currentValue;
      this.getPagesFormArray(this.currentFieldIndex, this.currentPdfIndex).at(this.currentPageIndex).patchValue({co_ordinate: [x,y]});
    }
  }

  get fieldsFormArray() {
    return this.updateForm.get('fields') as FormArray;
  }

  addField() {
    const field = this.fb.group({
      field_name: this.fb.control('',[Validators.required]),
      field_type: this.fb.control('',[Validators.required]),
      estimated_time: this.fb.control('',[Validators.required]),
      sequence: this.fb.control('',[Validators.required]),
      location: this.fb.array([]) // Array of nested groups
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
    this.createPopupMessage('info', "Update Form Cancelled");
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
  }
  create(): void {
    const {name,fields } = this.updateForm.value;
    console.log(name,fields);
    this.formApi.updateForm( this.defaultFormInfo.team_id, this.defaultFormInfo.role_id, { name,fields }).subscribe( {
      next: res => {
        if(res) this.createPopupMessage('success', "Form Updated Successfully");
        console.log(res);
      },
      error: err => {
        this.createPopupMessage('error', "Form is not updated")
        console.error(err);
      }

    });
    this.visible = false;
    this.isVisibleChange.emit(this.visible);
    this.updateForm.reset();
  }
  createPopupMessage( type: string, message: string): void {
    this.message.create(type, message, { nzDuration: 2000, nzPauseOnHover: true });
  }

  coordinateInput(event: any, fieldIndex: number, pdfIndex: number, pageIndex: number) {
    const {value} = event.target;
    const [x,y] = value.split(',');
    console.log(x,y,fieldIndex, pdfIndex, pageIndex);
    this.getPagesFormArray(fieldIndex, pdfIndex).at(pageIndex).patchValue({co_ordinate: [x,y]});
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

  }

}
