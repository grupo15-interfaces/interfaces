import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models';

// USUARIOS DE PRUEBA
const MOCK_USERS: User[] = [
  { id: 1, name: 'Admin RedSalud', email: 'admin@redsalud.cl', role: 'Administrador de Boxes' },
  { id: 2, name: 'Coord RedSalud', email: 'coord@redsalud.cl', role: 'Coordinador de Boxes' }
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }

  login(email: string, password: string): boolean {
    const user = MOCK_USERS.find(u => u.email === email);
    // En un caso real, la contraseña se verificaría contra un hash
    if (user && password === '1234') { // Contraseña de prueba para ambos usuarios
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser.set(user);
      this.router.navigate(['/app/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser()?.role === role;
  }

  isAdministrador(): boolean {
    return this.hasRole('Administrador de Boxes');
  }

  isCoordinador(): boolean {
    return this.hasRole('Coordinador de Boxes');
  }
}