import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WriteService } from '../../../services/write/write.service';
import { map, Observable, switchMap } from 'rxjs';
import { SenderService } from '../../../services/sender/sender.service';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-write-form',
  templateUrl: './write-form.component.html',
  styleUrl: './write-form.component.css',
})
export class WriteFormComponent implements OnInit {
  size: NzButtonSize = 'small';
  formValue: any = {};
  obj: any = {};
  myForm!: FormGroup;
  secondFormGroup!: FormGroup;
  currentStep = 1;
  controlValue!: string;
  controlValue_index!: number;
  idx = 0;
  timeInterval!: Date;
  timeInMins!: number;

  @Input() controlNameValue!: { [key: string]: string };
  @Input() array_number!: number[];
  @Input() controlNames!: any;
  @Input() supportingValues!: any;
  @Input() field_id!: any;
  @Input() work_order_id!: number;
  @Input() assigned_to!: number;
  @Input() fieldsId!: any;
  @Input() acc_id!: any;
  @Input() customer_id!: any;
  @Input() customer_field_details!: any[];
  @Input() comment_card!: any;
  @Input() image_array!: any;
  @Input() distribute_work_order_list!: any[];
  @Input() customer_details!: any;
  totalTime: number = 0;
  @ViewChild('inputField') inputField!: ElementRef;
  coustomer_index = 0;
  firstField: any;

  textInputChecked = false;
  controlName!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NzModalService,
    private writeService: WriteService,
    private sharedService: SenderService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    console.log(this.array_number);
    console.log('Control Nmaes', this.controlNames);
    this.timeInterval = new Date(Date.now());
    this.myForm = this.fb.group({});
    if (this.inputField) {
      setTimeout(() => {
        this.inputField.nativeElement.focus(); // Autofocus the input field with a slight delay
      }, 0);
    }
    this.addControls();
  }

  addControls() {
    if (this.myForm) {
      this.myForm.reset();
      for (let step of this.controlNames) {
        for (let control of step) {
          this.myForm.addControl(control.value, this.fb.control(''));
        }
      }
    }
  }

  addTextInputControl() {
    this.myForm.addControl('textInput', this.fb.control(''));
  }

  goToStep(step: number, id: number) {
    this.coustomer_index += 1;
    this.timeInMins = Math.floor(
      (Date.now() - this.timeInterval.getTime()) / 60000
    );
    this.totalTime += this.timeInMins;

    const fieldValueIndex = step - 2;

    // Proceed with other logic
    let fieldname = this.controlValue;

    if (fieldname) {
      let work_order_id = this.supportingValues[fieldValueIndex].work_order_id;
      let field_id = this.supportingValues[fieldValueIndex].field_id;
      let fieldName = this.myForm.value[fieldname];
      this.postFormValue(fieldName, work_order_id, id, this.timeInMins);
    }

    this.currentStep = step;
    this.addControls(); // Reset the form controls
    this.timeInterval = new Date(Date.now());

    this.onSubmit(this.distribute_work_order_list[fieldValueIndex]); //analysis
  }

  postFormValue(
    value: string,
    work_order_id: number,
    field_id: number,
    time: number
  ) {
    this.writeService
      .PostFieldData(work_order_id, field_id, value, time, this.assigned_to)
      .subscribe((data) => {});
  }

  onSubmit(work_order_id: number) {
    // this.router.navigate(['employee-dashboard',this.assigned_to,3])
    const approve = {
      work_order_id: work_order_id,
      assigned_to: this.assigned_to,
    };
    const data = {
      work_order_id: work_order_id,
      time_interval: this.totalTime,
      error_count: 0,
      employee_id: this.assigned_to,
    };

    this.writeService
      .writeSubmit(approve)
      .pipe(switchMap(() => this.writeService.postEmployeeStats(data)))
      .subscribe(
        () => {
          // Handle success
        },
        (error) => {
          // Handle error
        }
      );
  }

  logInputName(inputName: string, index: number) {
    this.controlValue = inputName;
    this.controlValue_index = index;

    for (let i = 0; i < this.customer_field_details.length; i++) {
      if (this.customer_field_details[i].uuid === index) {
        this.sharedService.setFieldValue(this.customer_field_details[i].uuid);
      }
    }
  }

  getCustomerDetail(work_order_id: number) {
    // console.log(work_order_id, this.customer_details);

    for (let detail of this.customer_details) {
      if (detail[work_order_id]) {
        return detail[work_order_id];
      }
    }
    return null;
  }

  createArray(input: number): void {
    for (let i = 1; i <= input + 1; i++) {
      this.array_number.push(i);
    }
  }

  getErrorComments(id: number) {
    let com = this.comment_card.find((el: any) => el.id == id);
    // console.log('com', com);
    return com.err_comment;
  }

  submit() {
    this.employeeService.getOnePeople(this.assigned_to).subscribe((data) => {
      this.router.navigate(['employee-dashboard', this.assigned_to, data.employee.role_id]);
    })
    // this.router.navigate(['employee-dashboard', this.assigned_to, 3]);
  }
}
