import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.component';
import { Credential } from '../models/user/Credential';
import { User } from '../models/user/User';
import { Token } from '../models/user/Token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Authenticate user and retrieve tokens
   * @param myCredential Credential object with email and password
   */
  tokenAuth(myCredential: Credential): Observable<Token> {
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
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
