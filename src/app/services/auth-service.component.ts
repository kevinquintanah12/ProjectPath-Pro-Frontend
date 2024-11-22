import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  // Importa `map` y `catchError`
import { of } from 'rxjs'; // Para manejar los errores sin interrumpir la ejecución
import { environment } from '../environment/environment.component';  // Asegúrate de configurar tu URL base en el archivo de entorno

interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; // Configura la URL base en el archivo de entorno

  constructor(private http: HttpClient) {}

  // Método para registrar usuario
  register(request: RegisterRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/register`, request);
  }

  // Método para hacer login
  login(request: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, request);
  }

  // Método para refrescar el token
  refreshToken(authHeader: string): Observable<TokenResponse> {
    const headers = new HttpHeaders().set('Authorization', authHeader);
    return this.http.post<TokenResponse>(`${this.apiUrl}/refresh`, {}, { headers });
  }

  // Método para verificar si el servidor está disponible (ping)
  checkConnection(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/ping`, { observe: 'response' }).pipe(
      catchError((err) => {
        console.error('Error de conexión:', err);
        return of(false); // Devuelve false si hay un error (sin conexión)
      }),
      map(() => true) // Si la respuesta es exitosa, devuelve true
    );
  }
}
