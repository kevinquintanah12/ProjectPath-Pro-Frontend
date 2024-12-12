import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './services/TokenService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.getToken()) {
      return true; // Permite el acceso si el token está presente
    } else {
      this.router.navigate(['/login']); // Redirige al login si no hay token
      return false;
    }
  }
}
