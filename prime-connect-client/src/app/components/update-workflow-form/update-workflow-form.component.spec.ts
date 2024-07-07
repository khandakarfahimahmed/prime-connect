import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkflowFormComponent } from './update-workflow-form.component';

describe('UpdateWorkflowFormComponent', () => {
  let component: UpdateWorkflowFormComponent;
  let fixture: ComponentFixture<UpdateWorkflowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateWorkflowFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateWorkflowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
