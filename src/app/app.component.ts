import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <router-outlet></router-outlet>
  `,
  imports: [ RouterOutlet] // Importa HeaderComponent y RouterOutlet aquí
})
export class AppComponent {
  title = 'CPM System';  // Puedes personalizar el título aquí
}
