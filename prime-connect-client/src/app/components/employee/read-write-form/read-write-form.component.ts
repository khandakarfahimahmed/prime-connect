
import { WriteService } from '../../../services/write/write.service';
import { SenderService } from '../../../services/sender/sender.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';



@Component({
  selector: 'app-read-write-form',
  templateUrl: './read-write-form.component.html',
  styleUrl: './read-write-form.component.css'
})
export class ReadWriteFormComponent implements OnInit{
  size: NzButtonSize = 'small';
  formValue: any = {};
  obj: any = {};
  myForm!: FormGroup;
  secondFormGroup!: FormGroup;
  formCount = 0;
  currentStep = 1;
  controlValue!: string;
 
  @Input() controlNameValue!: { [key: string]: string };
  @Input() array_number!: number[];
  @Input() controlNames!: any;
  @Input() customer_field_details!: any[];
  @Input() fields!: number[];
  @Input() work_order_id!: number;
  @Input() assigned_to!: number;
  @Input() uuid: number[] = [];

  
  textInputChecked = false;
  controlName!: string;

  constructor(private fb: FormBuilder,private employeeService: EmployeeService, private router: Router, private modalService: NzModalService, private writeService: WriteService, private sharedService: SenderService) {}

  ngOnInit() {
    this.array_number = [1];
    this.controlNames = [this.controlNames]
    // console.log('uuid', this.uuid)
    console.log('fields Ids', this.fields)
    console.log(this.controlNames)
    console.log('customer', this.customer_field_details)
    console.log(this.controlNameValue)
    this.myForm = this.fb.group({});
    this.addControls();
    this.addTextInputControl(); // Add text input control
    console.log(this.array_number)
    // Set default values for form controls
    this.setDefaultValues();
  }
  
  setDefaultValues() {
    // Assuming controlNameValue contains the default values
    if (this.controlNameValue) {
      this.myForm.patchValue(this.controlNameValue);
    }
  }

  addControls() {
    for (let step of this.controlNames) {
      for (let control of step) {
        this.myForm.addControl(control, this.fb.control('', Validators.required));
      }
    }
  }

  addTextInputControl() {
    this.myForm.addControl('textInput', this.fb.control(''));
  }
  goToStep(step: number) {
    this.currentStep = step;
  }
  onSubmit() {
    const newArray: (number | string)[] = [];
    const comments = [];
    const fields = [];
   
    if (this.myForm.valid) {
      // this.router.navigate(['employee-dashboard',this.assigned_to, this.work_order_id]);
      this.employeeService.getOnePeople(this.assigned_to).subscribe((data) => {
        this.router.navigate(['employee-dashboard', this.assigned_to, data.employee.role_id]);
      })
        let result: any = {};
        console.log('dj', this.myForm.value);
        for (let key in this.myForm.value) {
            result[key] = {
                value: this.myForm.value[key],
                status: key in this.formValue ? this.formValue[key] : true,
                comments: key in this.obj ? this.obj[key] : []
            };
        }

        let index = 0;
        for (let key in result) {
            if (result[key].status === false || result[key].comments.length > 0) {
                let all_comments = result[key].comments.join(' ');
                comments.push(all_comments);
                const field = this.customer_field_details.find(field => field.field_name === key);
                fields.push(field.id);
            }
        }

        fields.forEach(field => {
            let matchedObject: any = this.fields.find(obj => Object.keys(obj)[0] === field.toString());
            if (matchedObject) {
                newArray.push(matchedObject[field]);
            }
        });
        // console.log('all values', result);
        // console.log('comments', comments);
        // console.log('fields', fields);
        // console.log('result', this.fields);
        // console.log('obj', newArray);
        // console.log(this.work_order_id)
        // console.log(this.assigned_to)
        const data = {"fields": fields, "comments": comments,"fields_assigned": newArray, "work_order_id": this.work_order_id, "assigned_to": this.assigned_to}; //might need to change the comment portion
        this.writeService.readWriteSubmit(data).subscribe();
    }
}

  // addCross( controlName: string) {
  //   if (this.formValue[controlName] !== undefined) {
  //     this.formValue[controlName] = !this.formValue[controlName];
  //   } else {
  //     this.formValue[controlName] = false;
  //   }
  // }
  addCross(controlName: string) {
    console.log('hi control', controlName);
    console.log('formValue', this.formValue);
    if (this.formValue.hasOwnProperty(controlName)) {
        this.formValue[controlName] = !this.formValue[controlName];
    } else {
        this.formValue[controlName] = false;
    }
}


  addComment(){
    
  }

  isVisible = false;
  isConfirmLoading = false;

  showModal1(controlName: string): void {
    this.isVisible = true;
    this.controlName = controlName; // Update controlName based on user interaction
    console.log('naruto',this.controlName);
  }

  showModal2(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitModalValues(controlName: string) {
    console.log('html check', this.controlName); // Check the value of controlName
    // Logging the checked values
   
    const checkedValues: string[] = [];
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedValues.push(checkbox.value);
      }
    });
    // Logging the value of the text input
    const textInputValue = this.myForm.get('textInput')!.value;
    checkedValues.push(textInputValue);
    
    // Assign comments to the correct key in the obj object
    this.obj[this.controlName] = checkedValues;
   
    this.isVisible = false;    
}


  // logInputName(inputName: string) {
  //   console.log("Input name:", inputName);
  // }
  logInputName(inputName: string) {
    this.controlValue = inputName;
    for (let i = 0; i < this.customer_field_details.length; i++) {
      if (this.customer_field_details[i].field_name === inputName) {
        console.log('check',this.customer_field_details[i].id);
        let uuid: any = this.fields.find(obj => obj.hasOwnProperty(this.customer_field_details[i].id));
        const uuid_value = uuid ? uuid[this.customer_field_details[i].id] : undefined;
        this.sharedService.setFieldValue(uuid_value);
      }
    }
  }
  
  logValuesAndComments(controlName: string) {
    
    const control = this.myForm.get(controlName);
    console.log(controlName)
    if (control && control.valid) {
      
      const result: any = {};
      result[controlName] = {
        value: control.value,
        status: controlName in this.formValue ? this.formValue[controlName] : true,
        comments: controlName in this.obj ? this.obj[controlName] : []
      };
    
    }
  }
}
