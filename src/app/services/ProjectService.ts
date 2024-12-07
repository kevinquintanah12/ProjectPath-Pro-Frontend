import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './TokenService';
import { environment } from '../environment/environment.component'; // Asumiendo que tienes un archivo de configuración con la URL base

interface ProjectDto {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `${environment.apiBaseUrl}/api/projects`; // Usa la URL base desde el archivo de entorno

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createProject(project: ProjectDto): Observable<ProjectDto> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });

    return this.http.post<ProjectDto>(this.apiUrl, project, { headers });
  }
}
