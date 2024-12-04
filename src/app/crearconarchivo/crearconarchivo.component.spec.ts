import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConArchivoComponent } from './crearconarchivo.component';

describe('CrearconarchivoComponent', () => {
  let component: CrearConArchivoComponent;
  let fixture: ComponentFixture<CrearConArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearConArchivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearConArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
