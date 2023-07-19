import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppManageSettingsComponent } from './app-manage-settings.component';

describe('AppManageSettingsComponent', () => {
  let component: AppManageSettingsComponent;
  let fixture: ComponentFixture<AppManageSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppManageSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppManageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
