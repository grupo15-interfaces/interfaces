import { Injectable, signal } from '@angular/core';

export interface AppNotification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = signal<AppNotification[]>([]);

  // Simulación de alertas por boxes desocupados (RF-09)
  constructor() {
    setTimeout(() => {
        this.addNotification('warning', 'Alerta: El Box 202 ha permanecido desocupado en el bloque 14:00-15:00.');
    }, 15000); // Simula una alerta después de 15 segundos
  }

  addNotification(type: AppNotification['type'], message: string) {
    const notification: AppNotification = { type, message, timestamp: new Date() };
    this.notifications.update(current => [notification, ...current]);

    // Opcional: eliminar notificaciones antiguas
    setTimeout(() => {
        this.notifications.update(current => current.filter(n => n !== notification));
    }, 10000);
  }

  clearNotifications() {
    this.notifications.set([]);
  }
}