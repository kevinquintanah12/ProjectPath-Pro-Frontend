import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/TokenService';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  processing: boolean = false; // Indica si la pantalla de carga está activa

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  checkField(control: any): boolean {
    return control?.invalid && control?.touched;
  }

  onSubmitButtonClicked() {
    this.error = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    this.processing = true; // Activa la pantalla de carga
  
    const credentials = this.loginForm.value;
  
    this.userService.tokenAuth(credentials).subscribe({
      next: (response) => {
        console.log('Respuesta completa del backend (Token):', response);
  
        // Almacena el token y el ID del usuario en localStorage
        this.tokenService.setToken(response.access_token);
        localStorage.setItem('authToken', response.access_token);
        localStorage.setItem('email', credentials.username);
  
        // Llamar al servicio para obtener información del usuario por email
        this.userService.getUserByEmail(credentials.username).subscribe({
          next: (userResponse) => {
            console.log('Servicio getUserByEmail llamado exitosamente.');
            console.log('ID del usuario devuelto:', userResponse.id);
  
            // Almacenar el ID del usuario en localStorage
            localStorage.setItem('userId', userResponse.id.toString());  
            // Redirigir a la página de inicio
            this.router.navigate(['/inicio']);
          },
          error: (err) => {
            console.error('Error al obtener el usuario por email:', err);
            this.error = 'No se pudo obtener la información del usuario.';
          },
          complete: () => {
            this.processing = false; // Desactiva la pantalla de carga al finalizar
          },
        });
      },
      error: (err) => {
        console.error('Error en el inicio de sesión:', err);
        this.error = 'Usuario o contraseña incorrectos.';
        this.processing = false; // Desactiva la pantalla de carga en caso de error
      },
      complete: () => {
        this.processing = false; // Desactiva la pantalla de carga al finalizar
      },
    });
  }
  
}
