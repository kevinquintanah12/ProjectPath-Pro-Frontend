import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component'; // Asegúrate de que la ruta sea correcta
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  imports: [HeaderComponent, RouterOutlet] // Importa HeaderComponent y RouterOutlet aquí
})
export class AppComponent {
  title = 'CPM System';  // Puedes personalizar el título aquí
}
