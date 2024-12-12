import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarproyectosComponent } from './visualizarproyectos.component';

describe('VisualizarproyectosComponent', () => {
  let component: VisualizarproyectosComponent;
  let fixture: ComponentFixture<VisualizarproyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarproyectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
