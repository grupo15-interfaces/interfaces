import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentUser;
  totalReservations;
  totalBoxes;
  occupiedBoxesToday;

  constructor(
    // CORRECCIÓN: debe ser public para ser accesible desde el HTML
    public authService: AuthService,
    private dataService: DataService
  ) {
    // CORRECCIÓN: Inicializar aquí
    this.currentUser = this.authService.currentUser;
    this.totalReservations = computed(() => this.dataService.reservations().length);
    this.totalBoxes = computed(() => this.dataService.boxes().length);
    this.occupiedBoxesToday = computed(() => {
      const today = new Date().toISOString().split('T')[0];
      return this.dataService.reservations().filter(r => r.date === today).length;
    });
  }
}