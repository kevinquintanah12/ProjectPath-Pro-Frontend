import { Component } from '@angular/core';

@Component({
  selector: 'app-seccion-inicio',
  standalone: true,
  imports: [],
  templateUrl: './seccion-inicio.component.html',
  styleUrl: './seccion-inicio.component.css'
})
export class SeccionInicioComponent {


  scrollToSection() {
    const section = document.getElementById('inicio');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
    }
  }
}
