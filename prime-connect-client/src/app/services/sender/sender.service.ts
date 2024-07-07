import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SenderService {

  private fieldValueSubject = new BehaviorSubject<any>(null);
  fieldValue$ = this.fieldValueSubject.asObservable();
  
  setFieldValue(value: any) {
    
    this.fieldValueSubject.next(value);
  }

}
