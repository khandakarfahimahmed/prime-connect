import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadWriteFormComponent } from './read-write-form.component';

describe('ReadWriteFormComponent', () => {
  let component: ReadWriteFormComponent;
  let fixture: ComponentFixture<ReadWriteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadWriteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadWriteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
