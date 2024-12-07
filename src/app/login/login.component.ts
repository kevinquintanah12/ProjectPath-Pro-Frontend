import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/TokenService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  processing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService // Agregado aquí
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Verifica si un campo tiene errores después de interactuar con él.
   * @param control FormControl
   * @returns boolean
   */
  checkField(control: any): boolean {
    return control?.invalid && control?.touched;
  }

  /**
   * Inicia el proceso de inicio de sesión
   */
  onSubmitButtonClicked() {
    this.error = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.processing = true;

    const credentials = this.loginForm.value;

    this.userService.tokenAuth(credentials).subscribe({
      next: (response) => {
        console.log('Respuesta completa del backend:', response);

        // Guardar el token en el TokenService
        this.tokenService.setToken(response.access_token);
        this.tokenService.setToken(response.access_token); // Guardar el token en TokenService

        // Guardar el token y el email en localStorage
        localStorage.setItem('authToken', response.access_token); // Guardar el token con la clave authToken
        
        // Guardar el email en localStorage
        localStorage.setItem('email', credentials.username);

        // Redirigir al usuario al dashboard
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error('Error en el inicio de sesión:', err);
        this.error = 'Usuario o contraseña incorrectos.';
        this.processing = false;
      },
      complete: () => {
        this.processing = false;
      }
    });
  }
}
