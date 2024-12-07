import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/ProjectService';  // Asegúrate de que la ruta sea correcta
import { TokenService } from '../services/TokenService';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-creardesdecero',
  standalone: true,
  templateUrl: './creardesdecero.component.html',
  styleUrls: ['./creardesdecero.component.css'],
  imports: [ReactiveFormsModule]
})
export class CrearDesdeCeroComponent {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService  // Inyectamos el servicio aquí
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      // Obtener los valores del formulario
      const projectData = this.projectForm.value;

      // Usar el ProjectService para enviar la solicitud POST al backend
      this.projectService.createProject(projectData).subscribe(
        (response) => {
          console.log('Proyecto creado:', response);
          // Aquí puedes manejar la respuesta, por ejemplo, redirigir a otra página
        },
        (error) => {
          console.error('Error al crear el proyecto:', error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error
        }
      );
    }
  }
}
