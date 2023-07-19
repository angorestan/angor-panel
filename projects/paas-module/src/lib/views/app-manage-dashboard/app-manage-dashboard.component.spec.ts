import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppManageDashboardComponent } from './app-manage-dashboard.component';

describe('AppManageDashboardComponent', () => {
  let component: AppManageDashboardComponent;
  let fixture: ComponentFixture<AppManageDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppManageDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppManageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
