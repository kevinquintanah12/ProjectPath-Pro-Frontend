// calculation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Calculation } from '../models/user/Calculation';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  private apiUrl = 'http://localhost:8080/api/calculations';  // URL del backend

  constructor(private http: HttpClient) { }

  // Método para crear el diagrama de red y ruta crítica (POST)
  // calculationService.ts
    createNetworkAndCriticalPathDiagram(projectId: number): Observable<any> {
        return this.http.post(`http://localhost:8080/api/calculations/project/${projectId}`, {}, { responseType: 'text' });
    }

   // Método para actualizar el diagrama cuando se modifican las actividades (PATCH)
   updateNetworkAndCriticalPathDiagram(projectId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/project/diagram/${projectId}`, {}, { responseType: 'text' });
  }


    

  

  // Método para obtener un cálculo asociado a un proyecto (GET)
  getCalculationByProjectId(projectId: number): Observable<Calculation> {
    return this.http.get<Calculation>(`${this.apiUrl}/project/${projectId}` )
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error en la solicitud o en el lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error en la respuesta del servidor
      if (error.status === 404) {
        errorMessage = 'Calculation not found!';
      } else {
        errorMessage = `Server returned code: ${error.status}, message: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
