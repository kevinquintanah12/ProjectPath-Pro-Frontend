import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcpmComponent } from './dashboardcpm.component';

describe('DashboardcpmComponent', () => {
  let component: DashboardcpmComponent;
  let fixture: ComponentFixture<DashboardcpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardcpmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardcpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
