import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WriteService } from '../../../services/write/write.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Component({
  selector: 'read-write',
  templateUrl: './read-write.component.html',
  styleUrl: './read-write.component.css'
})
export class ReadWriteComponent {
  uuid: number[] = [];
  array_number: number[] = [];
  works: any[] = [];
  controlNames: any[] = [];
  loading: boolean = true;
  supportingValues: any[] = [];
  field_id: any[] = [];
  work_order_id !: number;
  assigned_to !: number;
  acc_id!: number;
  customer_id!: number;
  image_array: any[] = [];
  fieldsId: any[] = []; // Initialize fieldsId as an empty array
  customer_field_details!: any[];
  controlNameValue: any = {};
  fields!: number[];

  constructor(private writeService: WriteService, private route: ActivatedRoute) {
    // Initialize fieldsId as an empty array in the constructor
    this.fieldsId = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.assigned_to = params['employee_id'];
      this.work_order_id = params['order_id'];
    })
    this.getWorks(this.assigned_to, this.work_order_id);
  }

  getWorks(id: number, orderId: number): void {
    this.loading = true;

    this.writeService.getValuesForAuthor(orderId, id)
      .pipe(
        tap((data: any) => {
          this.works = data;
          for (let i = 0; i < data.fieldValue.length; i++) {
            this.fieldsId[i] = data.fieldValue[i].id;
          }
          
          
          const field_details = data.fieldValue;
          this.fields = data.fields;
          let fields_to_string: number[] = []
          let dist_work_string = ''
          this.fields.forEach((el: any)=>{
            const key = Object.keys(el)[0]
            const value = el[key]
            fields_to_string.push(value)
            dist_work_string +=this.work_order_id+ ','
          })
          this.uuid = fields_to_string
          dist_work_string = dist_work_string.slice(0, -1);
          // console.log('fields', fields_to_string)
          // console.log('fields dist', dist_work_string)
        
          this.customerDetails(dist_work_string,this.fieldsId.toString(), fields_to_string.toString()).subscribe();

          this.customer_field_details = field_details
          field_details.forEach((work: any) => {
            this.controlNames.push(work.field_name);
            this.controlNameValue[work.field_name] = work.value;
          });
        })
      )
      .subscribe({
        complete: () => {
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error fetching works:', error);
          this.loading = false;
        }
      });
  }

  customerDetails(work_dist: string, fieldIds: string, fields: string): Observable<void> {
    console.log('tfue', work_dist, 'twap', fieldIds, 'Tav', fields);
    return this.writeService.images4Maker(work_dist, fieldIds, fields).pipe(
      tap(data => {
        this.image_array = data;
      

        console.log('image array', this.image_array);
      }),
      catchError(error => {
        console.error('Error fetching images:', error);
        return throwError(error);
      })
    );
  }


  createArray(input: number): void {
    for (let i = 1; i <= input + 1; i++) {
      this.array_number.push(i);
    }
  }
}
