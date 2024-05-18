import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesTeachersComponent } from './classes-teachers.component';

describe('ClassesTeachersComponent', () => {
  let component: ClassesTeachersComponent;
  let fixture: ComponentFixture<ClassesTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesTeachersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassesTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
