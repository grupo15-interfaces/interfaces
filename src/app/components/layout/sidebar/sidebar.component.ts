import { Component, computed, Signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: Signal<User | null>;
  isAdministrador: Signal<boolean>;
  isCoordinador: Signal<boolean>;

  constructor(private authService: AuthService) {
    this.user = this.authService.currentUser;
    this.isAdministrador = computed(() => this.user()?.role === 'Administrador de Boxes');
    this.isCoordinador = computed(() => this.user()?.role === 'Coordinador de Boxes');
  }
}