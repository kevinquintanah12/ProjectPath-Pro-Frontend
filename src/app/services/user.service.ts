import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.component';
import { Credential } from '../models/user/Credential';
import { User } from '../models/user/User';
import { Token } from '../models/user/Token';
import { of } from 'rxjs';  // Importa 'of' de RxJS para emitir un valor por defecto (o error)
import { TokenService } from '../services/TokenService';
import { catchError } from 'rxjs/operators';  // Para el operador catchError
import { throwError } from 'rxjs';  // Para el operador throwError
import { tap } from 'rxjs/operators';  // Importa el operador tap de rxjs

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = environment.apiBaseUrl;
  private apiUserUrl = environment.apiUserUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService  // Inyectar TokenService
  ) {}


  /**
   * Authenticate user and retrieve tokens
   * @param myCredential Credential object with email and password
   */
  tokenAuth(myCredential: any): Observable<Token> {
    const url = `${this.apiBaseUrl}/auth/login`;
    return this.http.post<Token>(url, {
      email: myCredential.username,
      password: myCredential.password
    });
  } 
  

  /**
   * Register a new user
   * @param myUser User object containing user data
   */
  createUser(myUser: User): Observable<Token> {
    const url = `${this.apiBaseUrl}/auth/register`;
    return this.http.post<Token>(url, {
      fullName: myUser.username,
      username: myUser.username,
      email: myUser.email,
      dateOfBirth: '2000-01-01', // Example default value, replace as needed
      password: myUser.password
    });
  }

  /**
 * Get user by email with token authentication
 * @param email User's email
 */
  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUserUrl}/by-email?email=${email}`;
    const token = this.tokenService.getToken(); // Obtener el token desde TokenService
    
    if (!token) {
      console.error('Token is missing or invalid');
      return throwError('Token is missing or invalid');
    }
  
    // Configura los encabezados exactamente igual que en la solicitud curl
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Origin', 'http://localhost:4200')   // Similar a -H "Origin: http://localhost:4200"
      .set('Accept', 'application/json');        // Similar a -H "Accept: application/json"
  
    console.log('Headers:', headers);  // Verifica los encabezados en la consola
  
    console.log('Making request to URL:', url);  // Imprimir la URL completa y otros datos
  
    // Asegúrate de enviar credenciales si es necesario
    return this.http.get<any>(url, { headers, withCredentials: true }).pipe(
      tap(response => {
        // Si la solicitud es exitosa, imprimir la respuesta
        console.log('Response from backend:', JSON.stringify(response, null, 2));
      }),
      catchError((error) => {
        // Si ocurre un error, imprimir más detalles sobre el error
        console.error('Error in request:', error);
        if (error.status === 0) {
          console.error('Backend is not responding or CORS issue');
        } else {
          console.error(`Error status: ${error.status}, Error message: ${error.message}`);
        }
        return throwError(error); // Lanzar el error para que sea manejado por el suscriptor
      })
    );
  }
  
  
  
  
  

  /**
   * Fetch current user details
   * @param token JWT token for authentication
   */
  getCurrentUser(token: string): Observable<User> {
    const url = `${this.apiBaseUrl}/user/me`;
    const headers = this.createAuthHeader(token);
    return this.http.get<User>(url, { headers });
  }

  /**
   * Helper method to create authorization headers
   * @param token JWT token
   */
  private createAuthHeader(token: string): HttpHeaders {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers); // Verifica los encabezados en la consola
    return headers;
  }

  /**
   * Refresh the access token
   * @param refreshToken Refresh token string
   */
  refreshToken(refreshToken: string): Observable<Token> {
    const url = `${this.apiBaseUrl}/auth/refresh`;
    const headers = this.createAuthHeader(refreshToken);
    return this.http.post<Token>(url, {}, { headers });
  }

  /**
   * Reset password for a user
   * @param email User's email
   */
  sendUrlResetPassword(email: string): Observable<any> {
    const url = `${this.apiBaseUrl}/auth/send-reset-password`;
    return this.http.post(url, { email });
  }

  /**
   * Validate the reset password token
   * @param token Reset token
   */
  validateToken(token: string): Observable<any> {
    const url = `${this.apiBaseUrl}/auth/validate-reset-token`;
    return this.http.post(url, { token });
  }

  /**
   * Destroy the token on logout
   * @param token JWT token to invalidate
   */
  destroyToken(token: string): Observable<any> {
    const url = `${this.apiBaseUrl}/auth/logout`;
    const headers = this.createAuthHeader(token);
    return this.http.post(url, {}, { headers });
  }
}
