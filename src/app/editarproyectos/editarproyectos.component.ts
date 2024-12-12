import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService, ProjectDto } from '../services/ProjectService';
import { ActivityService } from '../services/ActivitiesService';
import { Activity } from '../models/user/Activity';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { CalculationService } from '../services/CalculationService'; // Importa el servicio
import { Calculation } from '../models/user/Calculation';
@Component({
  selector: 'app-editarproyectos',
  standalone: true,
  templateUrl: './editarproyectos.component.html',
  styleUrls: ['./editarproyectos.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EditarproyectosComponent {
  proyecto: ProjectDto = {
    name: 'Nuevo Proyecto',
    description: 'Descripción del proyecto',
    userDto: {
      id: Number(localStorage.getItem('userId')) // Obtener el ID del usuario desde el localStorage
    }
  };
  
  actividades: Activity[] = [];
  actividadEditada: Activity | null = null;
  errorMessage: string = '';
  calculations: Calculation | null = null; // Para almacenar el cálculo obtenido
  diagramBase64: string | null = null; // Imagen base64 del diagrama
  projectId: number | null = null; // Agregamos la propiedad para almacenar el ID del proyecto
  processing: boolean = false; // Pantalla de carga

  constructor(
    private projectService: ProjectService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private calculationService: CalculationService,


  ) {}

  ngOnInit(): void {
    // Obtener el ID del proyecto de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id) {
      // Obtener el proyecto
      this.getProjectById(id);
      
      // Obtener las actividades del proyecto
      this.getActivitiesByProjectId(id);
    } else {
      this.errorMessage = 'ID de proyecto no válido';
    }
  }

  // Obtener el proyecto por su ID
  getProjectById(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.proyecto = data; // Rellenar el proyecto
        this.projectId = id; // <--- Asignar el ID del proyecto
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar el proyecto';
        console.error(err);
      }
    });
  }
  

   // Método para manejar la acción del botón "Continuar"
   onContinue(): void {
    console.log('Botón Continuar presionado');

    // Activar pantalla de carga antes de redirigir
    this.processing = true;

    if (this.projectId) {
      // Actualizar el diagrama antes de redirigir
      this.updateDiagram(this.projectId);

      // Simulando una breve espera antes de la redirección
      setTimeout(() => {
        this.router.navigate(['/dashboard'], { queryParams: { projectId: this.projectId } });
        this.processing = false; // Desactivar pantalla de carga
      }, 5000); // 5 segundos de espera para mostrar la pantalla de carga
    } else {
      console.error('No se encontró el ID del proyecto para continuar.');
      this.processing = false; // Desactivar pantalla de carga en caso de error
    }
  }

  // Método para actualizar el diagrama
  updateDiagram(projectId: number): void {
    console.log(`Enviando solicitud para actualizar el diagrama con projectId: ${projectId}`);
  
    this.calculationService.updateNetworkAndCriticalPathDiagram(projectId).subscribe({
      next: (base64Image: string) => {
        console.log('Diagrama actualizado (Base64):', base64Image);
        this.diagramBase64 = `data:image/png;base64,${base64Image}`;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error en la respuesta del backend:', err);
        // Verifica si el error tiene una respuesta HTTP
        if (err.status) {
          console.error(`Error al actualizar el diagrama: ${err.status} - ${err.statusText}`);
          this.errorMessage = `Error al actualizar el diagrama: ${err.status} - ${err.statusText}`;
        } else {
          console.error('Error desconocido al actualizar el diagrama:', err.message);
          this.errorMessage = `Error desconocido al actualizar el diagrama: ${err.message}`;
        }
        this.diagramBase64 = null;  // Limpiar la imagen en caso de error
      }
    });
  }
  

  

  // Obtener las actividades del proyecto por su ID
  getActivitiesByProjectId(projectId: number): void {
    this.activityService.getActivitiesByProjectId(projectId).subscribe({
      next: (data) => {
        this.actividades = data; // Rellenar las actividades
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las actividades';
        console.error(err);
      }
    });
  }


  regresar(): void {
    this.router.navigate(['/seccionvisualizar']);
  }

  // Método para editar el proyecto
  editarProyecto(): void {
    if (this.proyecto) {
      this.projectService.updateProject(this.proyecto.id!, this.proyecto).subscribe({
        next: (updatedProject) => {
          console.log('Proyecto actualizado', updatedProject);
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar el proyecto';
          console.error(err);
        }
      });
    }
  }

  // Método para editar la actividad
  editarActividad(activity: Activity): void {
    this.actividadEditada = { ...activity }; // Crear una copia para editar
  }

  guardarActividad(): void {
    if (this.actividadEditada) {
      this.activityService.updateActivity(this.actividadEditada.id!, this.actividadEditada).subscribe({
        next: (updatedActivity) => {
          console.log('Actividad actualizada', updatedActivity);
          const index = this.actividades.findIndex((a) => a.id === updatedActivity.id);
          if (index !== -1) {
            this.actividades[index] = updatedActivity;
          }
          this.actividadEditada = null;
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar la actividad';
          console.error(err);
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.actividadEditada = null;
  }

  cerrarModal() {
    this.actividadEditada = null;
  }
  
}
