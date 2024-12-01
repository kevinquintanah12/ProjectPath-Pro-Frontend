import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/User';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { Credential } from '../models/user/Credential';

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
   * Register a new user
   */
  register() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: (token) => {
        // Almacenar el token en localStorage
        this.storageService.setLocal('authToken', token.accessToken);
        this.storageService.setLocal('refreshToken', token.refreshToken);

        this.successMessage = 'Usuario registrado exitosamente. Redirigiendo...';

        // Redirigir al usuario
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
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
