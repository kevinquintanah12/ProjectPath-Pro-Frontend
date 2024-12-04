import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crearconarchivo',
  standalone: true,
  templateUrl: './crearconarchivo.component.html',
  styleUrls: ['./crearconarchivo.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class CrearConArchivoComponent implements OnInit {
  projectForm!: FormGroup;
  fileName: string | null = null;
  excelPreview: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    try {
      // Inicializar el formulario reactivo
      this.projectForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
      });

      // Leer los datos del archivo Excel desde el localStorage
      const excelData = localStorage.getItem('excelData');
      if (excelData) {
        this.excelPreview = JSON.parse(excelData);
        this.fileName = 'Archivo cargado desde localStorage';
        console.log('Datos del archivo Excel:', this.excelPreview); // Mostrar datos en la consola
      } else {
        console.log('No se encontraron datos en el localStorage');
      }
    } catch (error) {
      console.error('Error al leer los datos del archivo Excel desde localStorage:', error);
    }
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    try {
      if (this.projectForm.valid && this.fileName) {
        const projectData = this.projectForm.value;
        console.log('Formulario enviado', projectData);
        console.log('Datos del archivo Excel', this.excelPreview);
      } else {
        console.log('Formulario inválido o archivo no cargado');
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
    }
  }

  // Actualiza la celda al perder el foco
  updateCell(rowIndex: number, cellIndex: number, event: Event): void {
    const inputValue = (event.target as HTMLElement).innerText.trim();
    this.excelPreview[rowIndex][cellIndex] = inputValue;
    console.log('Celda actualizada:', { rowIndex, cellIndex, inputValue });
  }

  // Mantiene el foco en la celda seleccionada
  onCellFocus(event: Event): void {
    const target = event.target as HTMLElement;
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(target);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
}
