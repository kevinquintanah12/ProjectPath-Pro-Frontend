import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../services/ActivitiesService';
import { Activity } from '../models/user/Activity';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearactividades',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crearactividades.component.html',
  styleUrls: ['./crearactividades.component.css'],
})
export class CrearactividadesComponent implements OnInit {
  activityForm: FormGroup;
  activities: Activity[] = [];
  projectId: number | undefined;
  predecessorsAlert = false;
  processing: boolean = false; // Pantalla de carga

  selectedActivity: Activity | null = null;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private route: ActivatedRoute,  
    private router: Router
  ) {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      label: [{ value: '', disabled: true }],
      predecessors: [''],  // Predecesores no son requeridos
      daysDuration: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.projectId = +params['projectId'];
      console.log('ID del proyecto:', this.projectId);

      this.activities = [];

      if (this.projectId) {
        this.loadActivities();
      }
    });
  }

  loadActivities(): void {
    if (this.projectId) {
      this.activityService.getActivitiesByProjectId(this.projectId).subscribe({
        next: (data) => {
          this.activities = data;
        },
        error: (err) => console.error('Error al cargar actividades:', err),
      });
    }
  }

  private generateLabel(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const count = this.activities.length + 1;
    let label = '';
    let num = count;

    while (num > 0) {
      num--;
      label = alphabet[num % 26] + label;
      num = Math.floor(num / 26);
    }
    return label;
  }

  private validatePredecessors(predecessors: string): boolean {
    if (predecessors === '') return true; // Permitir vacío
    const validPattern = /^[A-Z]+(,[A-Z]+)*$/; 
    return validPattern.test(predecessors);
  }

  saveActivity(): void {
    let predecessors = this.activityForm.value.predecessors;

    if (predecessors === '') {
      predecessors = null; // Si está vacío, se guarda como null
    } else if (!this.validatePredecessors(predecessors)) {
      this.predecessorsAlert = true; // Alerta si no es válido
      return;
    }

    this.predecessorsAlert = false;

    if (this.activityForm.valid && this.projectId) {
      const newActivity: Activity = {
        ...this.activityForm.value,
        label: this.generateLabel(),
        predecessors, // Guardar predecesores como null si está vacío
        projectDto: { id: this.projectId },
      };

      // Activar pantalla de carga

      if (this.selectedActivity) {
        this.activityService.updateActivity(this.selectedActivity.id!, newActivity).subscribe({
          next: (updatedActivity) => {
            const index = this.activities.findIndex(activity => activity.id === updatedActivity.id);
            if (index !== -1) {
              this.activities[index] = updatedActivity;
            }
            this.activityForm.reset();
            this.selectedActivity = null;

            // Simular el tiempo de espera de 3 segundos
            
          },
          error: (err) => {
            console.error('Error al actualizar la actividad:', err);
            this.processing = false; // Desactivar pantalla de carga en caso de error
          },
        });
      } else {
        this.activityService.createActivity(newActivity).subscribe({
          next: (savedActivity) => {
            this.activities.push(savedActivity);
            this.activityForm.reset();

            // Simular el tiempo de espera de 3 segundos
            
          },
          error: (err) => {
            console.error('Error al guardar la actividad:', err);
            this.processing = false; // Desactivar pantalla de carga en caso de error
          },
        });
      }
    }
  }

  editActivity(activity: Activity): void {
    this.selectedActivity = activity;
  
    let predecessors = activity.predecessors || ''; // Si no hay predecesores, asigna una cadena vacía
  
    // Si los predecesores están vacíos, se establece en null
    if (predecessors === '') {
      predecessors 
    } else if (!this.validatePredecessors(predecessors)) {
      this.predecessorsAlert = true; // Alerta si no es válido
      return; // No continuar con la edición si no son válidos
    }
  
    // Si es válido, restablece la alerta
    this.predecessorsAlert = false;
  
    // Rellenar el formulario con los valores de la actividad seleccionada
    this.activityForm.patchValue({
      name: activity.name,
      predecessors: predecessors, 
      daysDuration: activity.daysDuration,
    });
  }

  deleteActivity(activityId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      this.activityService.deleteActivity(activityId).subscribe({
        next: () => {
          this.activities = this.activities.filter(activity => activity.id !== activityId);
        },
        error: (err) => console.error('Error al eliminar la actividad:', err),
      });
    }
  }

  onContinue(): void {
    console.log('Botón Continuar presionado');

    // Activar pantalla de carga antes de redirigir
    this.processing = true;
    
    if (this.projectId) {
      // Simulando una breve espera antes de la redirección
      setTimeout(() => {
        this.router.navigate(['/dashboard'], { queryParams: { projectId: this.projectId } });
        this.processing = false; // Desactivar pantalla de carga
      }, 5000); // 1 segundo de espera para mostrar la pantalla de carga
    } else {
      console.error('No se encontró el ID del proyecto para continuar.');
      this.processing = false; // Desactivar pantalla de carga en caso de error
    }
  }
}
