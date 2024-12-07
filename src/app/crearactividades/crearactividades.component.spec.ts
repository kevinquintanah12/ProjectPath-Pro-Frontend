import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearactividadesComponent } from './crearactividades.component';

describe('CrearactividadesComponent', () => {
  let component: CrearactividadesComponent;
  let fixture: ComponentFixture<CrearactividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearactividadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearactividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
