import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crearproyecto',
  standalone: true,
  templateUrl: './crearproyecto.component.html',
  styleUrls: ['./crearproyecto.component.css'],
  imports: [ CommonModule],

})
export class CrearproyectoComponent {
  selectedFile: File | null = null;
  processing: boolean = false; // Indica si la pantalla de carga está activa

  constructor(private router: Router) {}

  // Método que se llama cuando se selecciona un archivo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Archivo seleccionado:', this.selectedFile);

      // Mostrar la pantalla de carga mientras se procesa el archivo
      this.processing = true;

      // Leer el archivo Excel y convertirlo en JSON
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });

        // Obtener los datos de la primera hoja
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log('Datos del archivo Excel:', jsonData); // Verifica si los datos se están extrayendo correctamente

        // Guardar los datos en localStorage
        localStorage.setItem('excelData', JSON.stringify(jsonData));

        // Simular el tiempo de procesamiento (ej. 4 segundos de carga)
        setTimeout(() => {
          // Desactivar la pantalla de carga después de 4 segundos
          this.processing = false;

          // Redirigir al componente 'CrearConArchivo' y pasar el JSON de los datos del archivo Excel
          this.router.navigate(['/crearconarchivo']);
        }, 9000); // Aquí puedes poner el tiempo en milisegundos (4000 ms = 4 segundos)
      };

      reader.readAsArrayBuffer(file); // Usar 'readAsArrayBuffer' para la lectura correcta
    }
  }

  // Redirige al formulario de crear desde cero
  redirectToCrearDesdeCero() {
    this.router.navigate(['/creardesdecero']);
  }
}
