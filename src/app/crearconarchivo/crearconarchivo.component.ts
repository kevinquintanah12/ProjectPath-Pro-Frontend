import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/ProjectService';
import { ActivityService } from '../services/ActivitiesService';
import { Activity } from '../models/user/Activity';

@Component({
  selector: 'app-crearconarchivo',
  standalone: true,
  templateUrl: './crearconarchivo.component.html',
  styleUrls: ['./crearconarchivo.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class CrearConArchivoComponent implements OnInit {
  projectForm!: FormGroup;
  fileName: string | null = null;
  excelPreview: any[] = [];
  errorMessage: string = ''; // Variable para almacenar el mensaje de error
  processing: boolean = false; // Indicador de carga

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    try {
      // Inicializar el formulario reactivo
      this.projectForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        predecessors: [''],  // Predecesores no son requeridos
      });

      // Leer los datos del archivo Excel desde el localStorage
      const excelData = localStorage.getItem('excelData');
      if (excelData) {
        this.excelPreview = JSON.parse(excelData);
        this.fileName = 'Archivo cargado desde localStorage';
        console.log('Datos del archivo Excel:', this.excelPreview); // Mostrar datos en la consola
      } else {
        console.log('No se encontraron datos en el localStorage');
      }
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = 'Hubo un error al leer el archivo desde localStorage: ' + error.message;
      } else {
        this.errorMessage = 'Hubo un error desconocido al leer el archivo desde localStorage.';
      }
      console.error(this.errorMessage);
    }
  }

  formatExcelData(projectId: number): Activity[] {
    const requiredColumns = ['nombre', 'detail', 'detalle', 'actividad'];
    let hasValidColumns = false;

    for (const row of this.excelPreview) {
      if (row.some((cell: string) => requiredColumns.some((word) => cell.toLowerCase().includes(word)))) {
        hasValidColumns = true;
        break;
      }
    }

    if (!hasValidColumns) {
      this.errorMessage = 'El archivo no contiene la estructura esperada (falta alguna de las columnas: nombre, detail, detalle, actividad)';
      return []; 
    }

    const formattedData = this.excelPreview
      .filter((row: any[]) => row.length > 0) 
      .slice(1) 
      .map((row: any[], index: number): Activity => {
        const [label, detail, predecessors, duration, detalle, actividad, name, nombre, etiqueta, predecesor, duracion] = row;
        return {
          id: index + 1, // Asignar IDs únicos basados en el índice inicial
          name: name || detail || detalle || actividad || nombre,
          label: label || etiqueta || null, 
          predecessors: (predecessors && predecessors !== '---')
            ? predecessors.replace(/\s+/g, '').split('').join(',')
            : null,
          daysDuration: parseInt(duration || duracion, 10) || 0, 
          projectDto: { id: projectId },
        };
      });

    // Generar etiquetas en orden alfabético
    const generateLabel = (index: number): string => {
      let label = '';
      while (index >= 0) {
        label = String.fromCharCode((index % 26) + 65) + label;
        index = Math.floor(index / 26) - 1;
      }
      return label;
    };

    // Asignar etiquetas dinámicas si no están definidas
    return formattedData.map((activity, index) => ({
      ...activity,
      label: activity.label || generateLabel(index),
    }));
  }

  onSubmit(): void {
    if (this.projectForm.valid && this.fileName) {
      const projectData = this.projectForm.value; // Obtén los valores del formulario
      const name = projectData.name; // Asegúrate de que coincidan con los campos del formulario
      const description = projectData.description;
  
      this.processing = true; // Activar pantalla de carga

      this.projectService.createProject(name, description).subscribe({
  
        next: (response) => {
          console.log('Proyecto creado:', response);
  
          const projectId = response.id;
  
          if (projectId === undefined) {
            this.errorMessage = 'El proyecto no tiene un ID válido.';
            console.error(this.errorMessage);
            this.processing = false; // Desactivar pantalla de carga en caso de error
            return;
          }
  
          // Reiniciar el contador para el ID de la actividad
          let activityId = 1; // Reiniciamos el contador del ID de las actividades
  
          const formattedActivities = this.formatExcelData(projectId);
  
          // Crear actividades secuencialmente
          this.createActivitiesSequentially(formattedActivities, 0, projectId, activityId);
        },
        error: (err) => {
          this.errorMessage = 'Error al crear el proyecto: ' + err.message;
          console.error(this.errorMessage);
          this.processing = false; // Desactivar pantalla de carga en caso de error
        },
      });
    } else {
      this.errorMessage = 'Formulario inválido o archivo no cargado';
      console.log(this.errorMessage);
    }
  }
  
  // Modificar la función createActivitiesSequentially para pasar el activityId
  createActivitiesSequentially(activities: Activity[], index: number, projectId: number, activityId: number): void {
    if (index >= activities.length) {
      console.log('Todas las actividades han sido creadas.');
      alert('Todas las actividades se han creado correctamente. Ahora serás redirigido al dashboard.');
      // Redirigir al dashboard
      setTimeout(() => {

      this.router.navigate(['/dashboard'], { queryParams: { projectId } });
      this.processing = false; // Desactivar pantalla de carga
    }, 5000);
      // Desactivar pantalla de carga
      return; // Salimos cuando todas las actividades están creadas
    }
  
    const activity = activities[index];
    activity.id = activityId++; // Asignar un ID secuencial a la actividad
  
    this.activityService.createActivity(activity).subscribe({
      next: (response) => {
        console.log(`Actividad ${index + 1} creada:`, response);
        // Llamar a la función recursivamente para la siguiente actividad
        this.createActivitiesSequentially(activities, index + 1, projectId, activityId);
      },
      error: (err) => {
        console.error(`Error al crear la actividad ${index + 1}:`, err);
        // Continúa con la siguiente actividad incluso si hay un error
        this.createActivitiesSequentially(activities, index + 1, projectId, activityId);
      },
    });
  }



  updateCell(rowIndex: number, cellIndex: number, event: Event): void {
    const inputValue = (event.target as HTMLElement).innerText.trim();
    this.excelPreview[rowIndex][cellIndex] = inputValue;
    console.log('Celda actualizada:', { rowIndex, cellIndex, inputValue });
  }

  onCellFocus(event: Event): void {
    const target = event.target as HTMLElement;
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(target);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
}
