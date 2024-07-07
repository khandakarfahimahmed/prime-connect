import { Component } from '@angular/core';
import { WriteService } from '../../../services/write/write.service';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent {
  array_number: number[] = [];
  works: any[] = [];
  controlNames: any[] = [];
  loading: boolean = true;
  supportingValues: any[] = [];
  field_id: any[] = [];
  work_order_id!: number;
  assigned_to!: number;
  acc_id!: number;
  customer_id!: number;
  image_array: any[] = [];
  fieldsId!: any[];
  customer_field_details!: any[];
  comment_card!: any;
  distribute_work_order_list: any[] = [];
  customer_details!: any;
  fields_temp!: any;
  allFieldsId: any[] = [];

  constructor(private writeService: WriteService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.assigned_to = params['employee_id'];
      this.work_order_id = params['order_id'];
    });

    this.getWorks(this.assigned_to, this.work_order_id);
  }

  getWorks(id: number, orderId: number): void {
    this.loading = true; // Set loading to true when fetching works
    console.log('id', id, 'orderId', orderId);
    this.writeService.distribute_work_order(id, orderId).subscribe(async (data) => {
      console.log('check data for work dist', data);
      this.works = data.dist;
      console.log('check distributed work', this.works);
      for (let orderId of this.works) {
        console.log('orderId', orderId.work_order_id);
        this.distribute_work_order_list.push(orderId.work_order_id);
      }

      console.log('this.distribute_work_order_list.toString()', this.distribute_work_order_list.toString());

      const customerDetails = await this.writeService.customerCreds(this.distribute_work_order_list.toString()).toPromise();
      this.customer_details = customerDetails;

      console.log('check customer details', this.customer_details);
      console.log('this.workss', this.works);

      this.field_id = data.fields;
      console.log('field id check', this.field_id);
      const fied_id_to_string = this.field_id.toString();
      console.log('fied_id_to_string check', fied_id_to_string);
    
      const comments = await this.writeService.getErrorComments(fied_id_to_string).toPromise();
      this.comment_card = comments;
      console.log('comments check 2', comments);

      const values = this.works.map(async work => {
        for (let i = 0; i < work.field_id.length; i++) {
          let obj = {
            'field_id': work.field_id[i],
            'work_order_id': work.work_order_id
          }
          this.supportingValues.push(obj);
        }
      });
      
      const requests = this.getFields(this.work_order_id, this.assigned_to);
      console.log('requests', requests);

      forkJoin(requests).subscribe(() => {
        console.log('temperr dist', this.distribute_work_order_list.toString(), 'all fields',
        this.allFieldsId.toString(), 'field',
        this.field_id.toString());

        // Make customerDetails call after all fields data is fetched and accumulated
        if (this.allFieldsId.length > 0) {
          this.customerDetails(
            this.distribute_work_order_list.toString(),
            this.allFieldsId.toString(),
            this.field_id.toString()
          ).subscribe(() => {
            this.loading = false; // Set loading to false after image_array is fetched
          });
        } else {
          this.loading = false; // In case there are no fields to fetch images for
        }

        this.createArray(this.controlNames.length);
      });
    });
  }

  getFields(order_id: number, assigned_to: number): Observable<void> {
    return this.writeService.field_data_by_work_id(order_id, assigned_to).pipe(
      tap((data: any) => {
        this.fields_temp = data;
        console.log('temp', this.fields_temp);
        console.log('data check', data);
        this.customer_field_details = data.fieldData;
        console.log('customer_field_details', this.customer_field_details);
        // this.controlNames = data.controlNames;

        console.log('data.controlNames', data.controlNames);

       const workList = new Set(this.distribute_work_order_list);
       const workListArray = Array.from(workList);
      console.log(workListArray);
        
        const len1 =  workListArray.length;
        const len2 = data.controlNames.length;
        // console.log(this.distribute_work_order_list);
        for( let i = 0; i< len1; i++){
          for(let j = 0; j< len2; j++){
            const len3 = data.controlNames[i].length;
            for(let k = 0; k< len3; k++){
              if(data.controlNames[j][k].work_order_id === workListArray[i]){   
                console.log(data.controlNames[j][k].work_order_id,workListArray[i]); 
                this.controlNames.push(data.controlNames[j]); 
              }
            }
        }
        }
        console.log('data.controlNames',  this.controlNames);

        // console.log('controlNames', this.controlNames);
        this.allFieldsId = data.fieldData.map((field: any) => field.id);
        console.log('accumulated allFieldsId', this.allFieldsId); // Accumulate fieldsId
      }),
      catchError(error => {
        console.error('Error fetching fields:', error);
        return throwError(error);
      })
    );
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
