import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { CalculationService } from '../services/CalculationService'; // Importa el servicio
import { Calculation } from '../models/user/Calculation';
import { ProjectService } from '../services/ProjectService'; // Importa el servicio ProjectService
import { ProjectDto } from '../services/ProjectService'; // Importa el tipo de datos de los proyectos
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardcpm',
  standalone: true,
  templateUrl: './dashboardcpm.component.html',
  styleUrls: ['./dashboardcpm.component.css'],
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatButtonModule],
})
export class DashboardcpmComponent implements OnInit {
  proyectos: ProjectDto[] = []; // Array para almacenar los proyectos obtenidos

  sections = ['Sección 1', 'Sección 2', 'Sección 3'];
  isDrawerOpen = false;
  activeSection: string | null = null;

  calculations: Calculation | null = null; // Para almacenar el cálculo obtenido
  errorMessage: string = ''; // Para manejar errores
  diagramBase64: string | null = null; // Imagen base64 del diagrama

  
  projectId: number | null = null; // ID del proyecto actual
  activities: any[] = []; // Inicializa actividades como un array vacío

  constructor(
    private calculationService: CalculationService,
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private projectService: ProjectService, private router: Router

  ) {}

  ngOnInit(): void {
    this.getProjects();

    this.route.queryParams.subscribe((params) => {
      this.projectId = +params['projectId'];
      console.log('ID del proyecto:', this.projectId);

      this.activities = []; // Reinicia actividades

      if (this.projectId) {
        this.loadDiagram(this.projectId); // Verifica y carga el diagrama
      }
    });
  }

  irAProyecto(id: number): void {
    console.log(`Navegando al proyecto con ID: ${id}`);
    this.router.navigate(['/dashboard'], { queryParams: { projectId: id } });
  }


  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  toggleSidebar() {
    const drawer = document.querySelector('mat-drawer') as any;
    drawer.toggle();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.proyectos = data; // Asigna los proyectos obtenidos al array
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los proyectos'; // Muestra el mensaje de error
        console.error(err);
      }
    });
  }

  selectSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

  loadDiagram(projectId: number): void {
    this.calculationService.getCalculationByProjectId(projectId).subscribe({
      next: (calculation) => {
        console.log('Cálculo existente encontrado:', calculation);
        this.updateDiagram(projectId); // Actualizar el diagrama si ya existe
      },
      error: () => {
        console.log('No se encontró un cálculo existente. Creando uno nuevo...');
        this.createDiagram(projectId); // Crear un nuevo diagrama si no existe
      },
    });
  }

  // Método para crear el diagrama de red y ruta crítica
  createDiagram(projectId: number): void {
    this.calculationService.createNetworkAndCriticalPathDiagram(projectId).subscribe({
      next: (base64Image: string) => {
        // Imprime en consola lo que se recibe del backend
        console.log('Respuesta del backend (Base64):', base64Image);

        // Procesa la imagen para mostrarla
        this.diagramBase64 = `data:image/png;base64,${base64Image}`;

        // Imprime en consola la cadena procesada
        console.log('Cadena procesada para <img>:', this.diagramBase64);

        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error al generar el diagrama.';
        this.diagramBase64 = null;

        // Imprime el error en consola
        console.error('Error al generar el diagrama:', err);
      },
    });
  }

  updateDiagram(projectId: number): void {
    this.calculationService.updateNetworkAndCriticalPathDiagram(projectId).subscribe({
      next: (base64Image: string) => {
        console.log('Diagrama actualizado (Base64):', base64Image);
        this.diagramBase64 = `data:image/png;base64,${base64Image}`;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error al actualizar el diagrama:', err);
        this.errorMessage = 'Error al actualizar el diagrama.';
        this.diagramBase64 = null;
      },
    });
  }

  // Método para manejar la acción cuando un proyecto es seleccionado
  onProjectSelected(projectId: number) {
    this.loadDiagram(projectId); // Verifica y carga el cálculo del proyecto seleccionado
  }
}
