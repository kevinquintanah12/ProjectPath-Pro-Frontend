import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seccion-crear',
  standalone: true,
  imports: [],
  templateUrl: './seccion-crear.component.html',
  styleUrl: './seccion-crear.component.css'
})
export class SeccionCrearComponent {

  constructor(private router: Router) {}

  onCrearProyectoClicked(): void {
    // Verificar si el token de autenticación existe en el localStorage
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      // Si no hay token, redirigir al login
      this.router.navigate(['/login']);
    } else {
      // Si hay token, continuar con el flujo normal (redirigir a la página de creación del proyecto)
      this.router.navigate(['/crear']);
    }
  }

}
