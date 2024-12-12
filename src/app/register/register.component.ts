import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/User';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    id: 0,
    username: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  /**
   * Validar formato de correo
   */
  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Register a new user
   */
  register() {
    // Validar campos obligatorios
    if (!this.user.username || !this.user.email || !this.user.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

   

    // Validar longitud de contraseña
    if (this.user.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    // Si pasa las validaciones, proceder con el registro
    this.userService.createUser(this.user).subscribe({
      next: (token) => {
        // Almacenar el token en localStorage
        this.storageService.setLocal('authToken', token.access_token);
        this.storageService.setLocal('refreshToken', token.refresh_token);

        this.successMessage = 'Usuario registrado exitosamente. Redirigiendo...';

        // Redirigir al usuario
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.errorMessage = 'Ocurrió un error durante el registro. Intenta nuevamente.';
      }
    });
  }

  /**
   * Limpiar mensajes de error y éxito
   */
  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
