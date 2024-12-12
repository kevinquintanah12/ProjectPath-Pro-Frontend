import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/ProjectService';  // Asegúrate de que la ruta sea correcta
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creardesdecero',
  standalone: true,
  templateUrl: './creardesdecero.component.html',
  styleUrls: ['./creardesdecero.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CrearDesdeCeroComponent {
  projectForm: FormGroup;
  processing: boolean = false; // Indica si la pantalla de carga está activa

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.projectForm.valid ) {
      const projectData = this.projectForm.value; // Obtén los valores del formulario
      const name = projectData.name; // Asegúrate de que coincidan con los campos del formulario
      const description = projectData.description;
      // Activar la pantalla de carga
      this.processing = true;

      // Usar el ProjectService para enviar la solicitud POST al backend
      this.projectService.createProject(name, description).subscribe(
        (response) => {
          console.log('Proyecto creado:', response);

          // Redirigir a CrearactividadesComponent con el ID del proyecto
          const projectId = response.id; // Asegúrate de que el backend devuelve un objeto con 'id'

          // Simular el tiempo de espera de 3 segundos
          setTimeout(() => {
            // Redirigir después de 3 segundos
            this.router.navigate(['/crearactividades'], { queryParams: { projectId } });

            // Desactivar la pantalla de carga
            this.processing = false;
          }, 10000); // 3000 ms = 3 segundos
        },
        (error) => {
          console.error('Error al crear el proyecto:', error);
          // Manejar el error aquí
          this.processing = false; // Desactivar la pantalla de carga en caso de error
        }
      );
    }
  }
}
