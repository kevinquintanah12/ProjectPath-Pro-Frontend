import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './TokenService';
import { environment } from '../environment/environment.component'; // Asumiendo que tienes un archivo de configuración con la URL base

export interface ProjectDto {
  id?: number;
  name: string;
  description: string;
  userDto: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `${environment.apiBaseUrl}/api/projects`; // Usa la URL base desde el archivo de entorno

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createProject(name: string, description: string): Observable<ProjectDto> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    const userId = localStorage.getItem('userId'); // Obtiene el ID del usuario almacenado
  
    if (!userId) {
      throw new Error('El ID del usuario no está disponible en el almacenamiento local.');
    }
  
    // Verificar el ID antes de enviarlo al backend
    console.log('ID del usuario:', userId);
  
    const project: ProjectDto = {
      name: name,           // Cambiado de "nombre" a "name"
      description: description, // Cambiado de "descripción" a "description"
      userDto: { 
        id: Number(userId)  // Asegurarse de que el id es numérico
      }
    };
  
    // Verificar el cuerpo del objeto antes de enviarlo
    console.log('Objeto del proyecto:', project);
  
    return this.http.post<ProjectDto>(this.apiUrl, project, { headers });
  }
  

  getProjects(): Observable<ProjectDto[]> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.get<ProjectDto[]>(this.apiUrl, { headers });
  }


  updateProject(id: number, project: ProjectDto): Observable<ProjectDto> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  
    return this.http.put<ProjectDto>(`${this.apiUrl}/${id}`, project, { headers });
  }


  getProjectById(id: number): Observable<ProjectDto> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
    return this.http.get<ProjectDto>(`${this.apiUrl}/${id}`, { headers });
  }
}
