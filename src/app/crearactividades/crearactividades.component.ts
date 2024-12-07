import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crearactividades',
  templateUrl: './crearactividades.component.html',
  styleUrls: ['./crearactividades.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class CrearactividadesComponent {
  activityForm: FormGroup;

  // Lista de actividades hardcodeada
  activities = [
    {
      name: 'Actividad 1',
      label: 'Etiqueta 1',
      predecessors: 'Ninguno',
      daysDuration: 5,
      closeStart: 1,
      distantStart: 3,
      closeFinish: 6,
      distantFinish: 8,
      slack: 2
    },
    {
      name: 'Actividad 2',
      label: 'Etiqueta 2',
      predecessors: 'Actividad 1',
      daysDuration: 3,
      closeStart: 4,
      distantStart: 5,
      closeFinish: 7,
      distantFinish: 9,
      slack: 1
    },
    {
      name: 'Actividad 3',
      label: 'Etiqueta 3',
      predecessors: 'Actividad 1, Actividad 2',
      daysDuration: 4,
      closeStart: 2,
      distantStart: 4,
      closeFinish: 6,
      distantFinish: 7,
      slack: 0
    }
  ];

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario con validaciones
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      predecessors: ['', Validators.required],
      daysDuration: [0, [Validators.required, Validators.min(1)]],
      closeStart: [0, [Validators.required]],
      distantStart: [0, [Validators.required]],
      closeFinish: [0, [Validators.required]],
      distantFinish: [0, [Validators.required]],
      slack: [0, [Validators.required]]
    });
  }

  // Método para guardar la actividad
  saveActivity() {
    if (this.activityForm.valid) {
      const newActivity = this.activityForm.value;
      this.activities.push(newActivity); // Agregar la nueva actividad a la lista
      this.activityForm.reset(); // Resetear el formulario después de agregar la actividad
    }
  }
}
  