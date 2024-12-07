import { Component, OnInit } from '@angular/core';
import { SeccionCrearComponent } from '../seccion-crear/seccion-crear.component';
import { CommonModule } from '@angular/common';
import { VisualizarproyectosComponent } from '../visualizarproyectos/visualizarproyectos.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-seccion-inicio',
  standalone: true,
  imports: [SeccionCrearComponent, CommonModule, VisualizarproyectosComponent, MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './seccion-inicio.component.html',
  styleUrls: ['./seccion-inicio.component.css'],
})

export class SeccionInicioComponent implements OnInit {

  user: any = {};
  showCrearDesdeCero: boolean = false;
  visualizar: boolean = false;
  isDrawerOpen = false;
  isAuthenticated: boolean = false;
  activeSection: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('email'); // Asegúrate de guardar el email en el localStorage durante el login.

    if (token && email) {
      this.isAuthenticated = true;
      this.user.email = email;  // Asigna el email al objeto `user`
    } else {
      console.log('Usuario no autenticado, redirigiendo al login...');
      this.router.navigate(['/login']); // Redirigir si no está autenticado
    }
  }

  logout() {
    // Eliminar el token del localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    // Redirigir al login o inicio
    this.router.navigate(['/login']);
  }

  proyectos() {
    // Redirigir a la sección de visualizar proyectos
    this.router.navigate(['/seccionvisualizar']);
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.5
    });

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  editProject(projectName: string) {
    alert(`Editando el proyecto: ${projectName}`);
  }

  toggleSidebar() {
    const drawer = document.querySelector('mat-drawer') as any;
    drawer.toggle();
  }

  selectSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

  visualizarProyectos() {
    this.visualizar = true;
    this.showCrearDesdeCero = false;
  }
}
