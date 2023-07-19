import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerScrollComponent } from './datepicker-scroll.component';

describe('DatepickerScrollComponent', () => {
  let component: DatepickerScrollComponent;
  let fixture: ComponentFixture<DatepickerScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
