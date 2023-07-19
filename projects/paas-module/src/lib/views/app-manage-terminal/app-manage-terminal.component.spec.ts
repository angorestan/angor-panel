import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppManageTerminalComponent } from './app-manage-terminal.component';

describe('AppManageTerminalComponent', () => {
  let component: AppManageTerminalComponent;
  let fixture: ComponentFixture<AppManageTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppManageTerminalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppManageTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
