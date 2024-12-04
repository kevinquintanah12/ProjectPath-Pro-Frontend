import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeccionCrearComponent } from '../seccion-crear/seccion-crear.component'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
@Component({
  selector: 'app-seccion-inicio',
  standalone: true,
  imports: [SeccionCrearComponent, CommonModule ], // Importa el componente standalone aquí
  templateUrl: './seccion-inicio.component.html',
  styleUrls: ['./seccion-inicio.component.css']
})
export class SeccionInicioComponent implements OnInit {
  showCrearDesdeCero: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Detectar la ruta activa y mostrar la sección crear
    this.route.url.subscribe((url) => {
      this.showCrearDesdeCero = url.length > 0 && url[0].path === 'crear';
    });
  }

  scrollToSection() {
    const section = document.getElementById('inicio');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
