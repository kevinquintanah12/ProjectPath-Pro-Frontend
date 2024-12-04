import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // Para los botones
@Component({
  selector: 'app-dashboardcpm',
  standalone: true,
  templateUrl: './dashboardcpm.component.html',
  styleUrls: ['./dashboardcpm.component.css'],
  imports: [ CommonModule, MatSidenavModule, MatIconModule, MatButtonModule],

})
export class DashboardcpmComponent {
  // Datos de ejemplo para las secciones
  sections = ['Sección 1', 'Sección 2', 'Sección 3'];
  isDrawerOpen = false; // Declarar la propiedad 'isDrawerOpen'

  
  // Variable para la sección activa
  activeSection: string | null = null;

  // Datos de ejemplo para los proyectos cargados anteriormente
  previousProjects = [
    { name: 'Proyecto ABC', creationDate: '15/11/2024' },
    { name: 'Proyecto DEF', creationDate: '20/10/2024' }
  ];

  ngAfterViewInit() {
    // Crear el IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active'); // Añadir la clase 'active' cuando el elemento entra en el viewport
        } else {
          entry.target.classList.remove('active'); // Remover la clase 'active' cuando el elemento sale del viewport
        }
      });
    }, {
      threshold: 0.5 // La mitad del elemento debe estar visible
    });

    // Observar todos los elementos con la clase 'section'
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // Métodos existentes para editar proyectos y seleccionar secciones
  editProject(projectName: string) {
    alert(`Editando el proyecto: ${projectName}`);
  }

  toggleSidebar() {
    const drawer = document.querySelector('mat-drawer') as any;
    drawer.toggle();
  }

  selectSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

}
