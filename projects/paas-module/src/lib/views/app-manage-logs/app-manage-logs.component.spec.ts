import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppManageLogsComponent } from './app-manage-logs.component';

describe('AppManageLogsComponent', () => {
  let component: AppManageLogsComponent;
  let fixture: ComponentFixture<AppManageLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppManageLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppManageLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
