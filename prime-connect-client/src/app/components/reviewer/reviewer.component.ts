import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReviewerService } from '../../services/reviewer.service';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'reviewer',
  templateUrl: './reviewer.component.html',
  styleUrl: './reviewer.component.css',
})
export class ReviewerComponent implements OnInit {
  reviewerForm!: FormGroup;
  workDetails!: any;
  source: string = '/assets/sample.pdf';
  pdfUrl!: any;
  currentPage = 1;
  acc_id!: number;
  team_id!: number;
  customer_id!: number;
  employee_id!: number;
  isLoading: boolean = false;
  radioValue = 'form';

  showLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reviewerService: ReviewerService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.showLoader();
    this.route.params.subscribe((params) => {
      this.acc_id = params['acc_id'];
      this.team_id = params['team_id'];
      this.customer_id = params['customer_id'];
      this.employee_id = params['employee_id'];
    });

    this.reviewerService
      .getWorkDetails(this.acc_id, this.team_id, this.customer_id)
      .subscribe((data) => {
        // console.log(data);
        // const blob = new Blob([data.pdf], { type: 'application/pdf' });
        // this.pdfUrl = URL.createObjectURL(blob);
        // console.log(blob);
        // this.source = data.pdf[0].data.data;
        this.workDetails = data;
        const {
          name,
          nid,
          phone,
          address,
          email,
          tin,
          acc_id,
          acc_type,
          customer_id,
          team_id,
          birth_certi,
        } = this.workDetails;
        this.reviewerForm = this.fb.group({
          name: this.fb.control(name, [Validators.required]),
          nid: this.fb.control(nid, [Validators.required]),
          phone: this.fb.control(phone, [Validators.required]),
          address: this.fb.control(address, [Validators.required]),
          email: this.fb.control(email, [Validators.required]),
          tin: this.fb.control(tin, [Validators.required]),
          acc_id: this.fb.control(acc_id, [Validators.required]),
          acc_type: this.fb.control(acc_type, [Validators.required]),
          customer_id: this.fb.control(customer_id, [Validators.required]),
          birth_certificate: this.fb.control(birth_certi, [
            Validators.required,
          ]),
        });
        console.log(this.reviewerForm.value);
        // console.log(this.workDetails);
      });
  }

  onSubmit() {
    console.log(this.reviewerForm.value);
    this.reviewerService
      .updateWorkDetails(this.acc_id, this.team_id, this.customer_id)
      .subscribe((data) => {
        console.log(data);
      });
    this.employeeService.getOnePeople(this.employee_id).subscribe((data) => {
      this.router.navigate(['employee-dashboard', this.employee_id, data.employee.role_id]);
    })
    // this.router.navigate(['employee-dashboard', this.employee_id, 2]);
  }

  formClicked() {
    this.radioValue = 'form';
    this.source = '/assets/sample.pdf';
  }
  nidClicked() {
    this.radioValue = 'nid';
    this.source = '/assets/nid2.pdf';
  }
  tinClicked() {
    this.radioValue = 'tin';
    this.source = '/assets/tin1.pdf';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'n') {
      this.radioValue = 'nid';
      this.source = '/assets/nid2.pdf';
    }
    if (event.key.toLowerCase() === 'f') {
      this.radioValue = 'form';
      this.source = '/assets/sample.pdf';
    }
    if (event.key.toLowerCase() === 't') {
      this.radioValue = 'tin';
      this.source = '/assets/tin1.pdf';
    }
  }
}
