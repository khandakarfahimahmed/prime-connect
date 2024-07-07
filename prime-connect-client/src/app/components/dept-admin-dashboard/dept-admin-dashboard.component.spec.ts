import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptAdminDashboardComponent } from './dept-admin-dashboard.component';

describe('DeptAdminDashboardComponent', () => {
  let component: DeptAdminDashboardComponent;
  let fixture: ComponentFixture<DeptAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeptAdminDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeptAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
