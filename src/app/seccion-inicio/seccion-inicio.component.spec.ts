import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionInicioComponent } from './seccion-inicio.component';

describe('SeccionInicioComponent', () => {
  let component: SeccionInicioComponent;
  let fixture: ComponentFixture<SeccionInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
