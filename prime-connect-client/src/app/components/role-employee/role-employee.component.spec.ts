import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEmployeeComponent } from './role-employee.component';

describe('RoleEmployeeComponent', () => {
  let component: RoleEmployeeComponent;
  let fixture: ComponentFixture<RoleEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
