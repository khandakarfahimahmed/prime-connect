import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WriteService {
  constructor(private http: HttpClient) {}
  distribute_work_order(id: number, orderId: number): Observable<any> {
    console.log(id, orderId);
    return this.http.get<any>(
      'http://localhost:3000/distribute-work-order/employee/' +
        id +
        '/' +
        orderId
    );
  }
  field_data_by_work_id(
    order_id: number,
    assigned_to: number
  ): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/field-data/fields/' + order_id + '/' + assigned_to
    );
  }
  PostFieldData(
    order_id: number,
    field_id: number,
    value: string,
    time_interval: number,
    assigned_to: number
  ): Observable<any> {
    const body = {
      field_id,
      order_id,
      value,
      time_interval,
      assigned_to,
    };
    console.log(body);
    return this.http.put<any>('http://localhost:3000/field-data/update', body);
  }
  customerDetails(work_order_id: number): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/main-work-order/view/' + work_order_id
    );
  }
  FormFieldLocation(
    field_id: number,
    customer_id: number,
    acc_id: number
  ): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/form/field/' +
        field_id +
        '/' +
        customer_id +
        '/' +
        acc_id
    );
  }
  getFormValues(order_id: number): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/field-data/field_values/' + order_id
    );
  }
  getValuesForAuthor(
    work_order_id: number,
    assigned_to: number
  ): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/distribute-work-order/author/' +
        work_order_id +
        '/' +
        assigned_to
    );
  }
  writeSubmit(data: any): Observable<any> {
    return this.http.put<any>(
      'http://localhost:3000/distribute-work-order/approve',
      data
    );
  }
  readWriteSubmit(data: any): Observable<any> {
    return this.http.put<any>(
      'http://localhost:3000/distribute-work-order/post-error-fields',
      data
    );
  }
  postEmployeeStats(data: any): Observable<any> {
    console.log('data check', data);
    return this.http.post<any>(
      'http://localhost:3000/distribute-work-order/employee_stats',
      data
    );
  }
  postEmployeeStatsAuthor(data: any): Observable<any> {
    console.log('data check', data);
    return this.http.post<any>(
      'http://localhost:3000/distribute-work-order/author_employee_stats',
      data
    );
  }
  getErrorComments(err: string): Observable<any> {
    return this.http.get<any>(
      'http://localhost:3000/field-data/error_fields/' + err
    );
  }

  customerCreds(fields: string): Observable<any> {
    console.log('fields check', fields);
    return this.http.get<any>(
      'http://localhost:3000/main-work-order/customer/' + fields
    );
  }

  images4Maker(work: string, fieldsId: string, fields: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/main-work-order/images/' + work + '/' + fieldsId + '/' + fields);
  }
}
