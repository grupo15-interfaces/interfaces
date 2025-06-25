import { Component, computed } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models';
import { AppNotification } from '../../../services/notification.service';
import { Signal } from '@angular/core';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Se declaran las propiedades aquí
  user: Signal<User | null>;
  notifications: Signal<AppNotification[]>;
  showNotifications = false;

  constructor(
    public authService: AuthService,
    private notificationService: NotificationService,
    public uiService: UiService
  ) {
    // Y se inicializan dentro del constructor, donde los servicios ya están disponibles
    this.user = this.authService.currentUser;
    this.notifications = this.notificationService.notifications;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}