import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa el Router para la navegación

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  error: string = '';
  processing: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {} // Inyecta el Router

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  // Validador para comprobar que las contraseñas coinciden
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { 'passwordMismatch': true }
      : null;
  }

  checkField(field: AbstractControl | null): boolean {
    if (!field) {
      return false; // Si field es null o undefined, retornamos false
    }
    return field.invalid && field.touched;
  }

  // Método para manejar el registro
  onRegisterButtonClicked(): void {
    if (this.registerForm.invalid) {
      this.error = 'Por favor, completa todos los campos obligatorios correctamente.';
      return;
    }

    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      console.log('Formulario enviado:', this.registerForm.value);
      // Redirigir a /login tras el registro exitoso
      this.router.navigate(['/login']);
    }, 2000); // Simula un retraso de 2 segundos para la respuesta
  }
}
