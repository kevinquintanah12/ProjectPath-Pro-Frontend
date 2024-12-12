import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { ProjectService } from '../services/ProjectService'; // Importa el servicio ProjectService
import { ProjectDto } from '../services/ProjectService'; // Importa el tipo de datos de los proyectos
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizarproyectos',
  standalone: true,
  imports: [ CommonModule ], // Importa el componente standalone aquí
  templateUrl: './visualizarproyectos.component.html',
  styleUrls: ['./visualizarproyectos.component.css']
})
export class VisualizarproyectosComponent implements OnInit {
  proyectos: ProjectDto[] = []; // Array para almacenar los proyectos obtenidos
  errorMessage: string = ''; // Para manejar errores

  // Inyecta el servicio ProjectService
  constructor(private projectService: ProjectService, private router: Router,) {}

  ngOnInit(): void {
    // Llama al método getProjects para obtener la lista de proyectos al inicializar el componente
    this.getProjects();
  }

  // Método para obtener los proyectos
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

  // Método para redirigir a un proyecto específico
  irAProyecto(id: number): void {
    console.log(`Navegando al proyecto con ID: ${id}`);
    this.router.navigate(['/dashboard'], { queryParams: { projectId: id } });
  }

  editarProyecto(id: number | undefined): void {
    if (id !== undefined) {
      console.log(`Redirigiendo a la edición del proyecto con ID: ${id}`);
      this.router.navigate([`/editarproyectos/${id}`]);
    } else {
      console.log("ID del proyecto no válido");
    }
  }
  
}
