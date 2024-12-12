    import { Injectable } from '@angular/core';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { TokenService } from './TokenService';
    import { environment } from '../environment/environment.component'; // Configuración de entorno

    interface ProjectDto {
    id: number;
    name?: string;
    description?: string;
    }

    interface Activity {
    id?: number;
    name: string;
    label?: string;
    predecessors?: string;
    daysDuration: number;
    projectDto: ProjectDto;
    }

    @Injectable({
    providedIn: 'root',
    })
    export class ActivityService {
    private apiUrl = `${environment.apiBaseUrl}/api/activities`;

    constructor(private http: HttpClient, private tokenService: TokenService) {}

    private getHeaders(): HttpHeaders {
        const token = this.tokenService.getToken();
        return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        });
    }

    createActivity(activity: Activity): Observable<Activity> {
        const headers = this.getHeaders();
        return this.http.post<Activity>(this.apiUrl, activity, { headers });
    }

    getActivities(): Observable<Activity[]> {
        const headers = this.getHeaders();
        return this.http.get<Activity[]>(this.apiUrl, { headers });
    }

    getActivityById(id: number): Observable<Activity> {
        const headers = this.getHeaders();
        return this.http.get<Activity>(`${this.apiUrl}/${id}`, { headers });
    }

    getActivitiesByProjectId(projectId: number): Observable<Activity[]> {
        const headers = this.getHeaders();
        return this.http.get<Activity[]>(`${this.apiUrl}/project/${projectId}`, { headers });
    }

    updateActivity(id: number, activity: Partial<Activity>): Observable<Activity> {
        const headers = this.getHeaders();
        return this.http.patch<Activity>(`${this.apiUrl}/${id}`, activity, { headers });
    }

    deleteActivity(id: number): Observable<void> {
        const headers = this.getHeaders();
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
    }
