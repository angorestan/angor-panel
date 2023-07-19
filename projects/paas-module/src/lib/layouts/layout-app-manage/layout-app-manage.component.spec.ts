import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAppManageComponent } from './layout-app-manage.component';

describe('LayoutAppManageComponent', () => {
  let component: LayoutAppManageComponent;
  let fixture: ComponentFixture<LayoutAppManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAppManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAppManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
