import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';
  processing: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  checkField(field: AbstractControl | null): boolean {
    if (!field) {
      return false; // Si field es null o undefined, retornamos false
    }
    return field.invalid && field.touched;
  }

  onSubmitButtonClicked(): void {
    if (this.loginForm.invalid) {
      this.error = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    console.log('Formulario enviado:', this.loginForm.value);

    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      // Simulando un error de validación
      this.error = 'Error al iniciar sesión. Verifica tus credenciales.';
    }, 2000);
  }
}
