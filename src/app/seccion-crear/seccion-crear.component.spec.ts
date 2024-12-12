import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionCrearComponent } from './seccion-crear.component';

describe('SeccionCrearComponent', () => {
  let component: SeccionCrearComponent;
  let fixture: ComponentFixture<SeccionCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
