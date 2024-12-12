import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDesdeCeroComponent } from './creardesdecero.component';

describe('CreardesdeceroComponent', () => {
  let component: CrearDesdeCeroComponent;
  let fixture: ComponentFixture<CrearDesdeCeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDesdeCeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDesdeCeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
