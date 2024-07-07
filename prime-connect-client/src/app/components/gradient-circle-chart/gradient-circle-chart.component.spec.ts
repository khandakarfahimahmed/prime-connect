import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientCircleChartComponent } from './gradient-circle-chart.component';

describe('GradientCircleChartComponent', () => {
  let component: GradientCircleChartComponent;
  let fixture: ComponentFixture<GradientCircleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradientCircleChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradientCircleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
