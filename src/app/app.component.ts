import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeccionInicioComponent } from './seccion-inicio/seccion-inicio.component';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
   
    <app-seccion-inicio></app-seccion-inicio> <!-- Incluye tu componente de seccion -->
    <router-outlet></router-outlet> <!-- Este es el lugar donde se renderizarán las rutas -->
  `,
  imports: [RouterOutlet, SeccionInicioComponent, MatToolbarModule] // Importa MatToolbarModule aquí
})
export class AppComponent {
  title = 'CPM System';
}
