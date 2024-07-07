import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadWriteComponent } from './read-write.component';

describe('ReadWriteComponent', () => {
  let component: ReadWriteComponent;
  let fixture: ComponentFixture<ReadWriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadWriteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
