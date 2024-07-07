import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteFormComponent } from './write-form.component';

describe('WriteFormComponent', () => {
  let component: WriteFormComponent;
  let fixture: ComponentFixture<WriteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WriteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
