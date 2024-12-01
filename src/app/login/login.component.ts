import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
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
    private storageService: StorageService,
    private router: Router
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
      next: (token) => {
        // Almacenar tokens en el StorageService
        this.storageService.setLocal('authToken', token.accessToken);
        this.storageService.setLocal('refreshToken', token.refreshToken);

        // Redirigir al usuario al dashboard
        this.router.navigate(['/dashboard']);
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
