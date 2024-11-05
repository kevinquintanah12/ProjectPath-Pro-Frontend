import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

import { SeccionInicioComponent } from './seccion-inicio/seccion-inicio.component';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header></app-header> <!-- Incluye tu componente de seccion -->

    <app-seccion-inicio></app-seccion-inicio> <!-- Incluye tu componente de seccion -->
    <router-outlet></router-outlet> <!-- Este es el lugar donde se renderizarán las rutas -->
  `,
  imports: [RouterOutlet, SeccionInicioComponent, MatToolbarModule,HeaderComponent] // Importa MatToolbarModule aquí
})
export class AppComponent {
  title = 'CPM System';
}
