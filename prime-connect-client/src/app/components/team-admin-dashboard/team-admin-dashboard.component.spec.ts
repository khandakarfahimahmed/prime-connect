import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAdminDashboardComponent } from './team-admin-dashboard.component';

describe('TeamAdminDashboardComponent', () => {
  let component: TeamAdminDashboardComponent;
  let fixture: ComponentFixture<TeamAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamAdminDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
