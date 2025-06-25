import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, AppNotification } from '../../../services/notification.service';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  // Corregido a styleUrl (singular) para consistencia
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
  // Solo se declara la propiedad aquí
  notifications: Signal<AppNotification[]>;

  constructor(private notificationService: NotificationService) {
    // La inicialización se hace DENTRO del constructor
    this.notifications = this.notificationService.notifications;
  }
}