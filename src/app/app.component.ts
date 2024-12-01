import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SeccionInicioComponent } from './seccion-inicio/seccion-inicio.component';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html', // Usa un archivo HTML separado
  styleUrls: ['./app.component.css'], // Usa un archivo CSS separado
  imports: [RouterOutlet, SeccionInicioComponent, MatToolbarModule, HeaderComponent, HttpClientModule]
})
export class AppComponent {
  title = 'CPM System';
}
