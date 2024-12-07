import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-visualizarproyectos',
  standalone: true,
  imports: [ CommonModule ], // Importa el componente standalone aquí

  templateUrl: './visualizarproyectos.component.html',
  styleUrls: ['./visualizarproyectos.component.css']
})
export class VisualizarproyectosComponent {
  proyectos = [
    { id: 1, nombre: 'Proyecto UNO', descripcion: 'Descripción del proyecto UNO' },
    { id: 2, nombre: 'Proyecto DOS', descripcion: 'Descripción del proyecto DOS' },
    { id: 3, nombre: 'Proyecto TRES', descripcion: 'Descripción del proyecto TRES' },
  ];

  irAProyecto(id: number): void {
    console.log(`Navegando al proyecto con ID: ${id}`);
    // Lógica para redirigir al proyecto
  }
}
