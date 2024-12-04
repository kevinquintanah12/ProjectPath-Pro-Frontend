import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-creardesdecero',
  standalone: true,

  templateUrl: './creardesdecero.component.html',
  styleUrls: ['./creardesdecero.component.css'],
  imports: [ ReactiveFormsModule]

})
export class CrearDesdeCeroComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      // Aquí puedes agregar la lógica para redirigir o guardar los datos.
    }
  }
}
