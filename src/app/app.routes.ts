import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ReservationManagementComponent } from './components/pages/reservation-management/reservation-management.component';
import { BoxAvailabilityComponent } from './components/pages/box-availability/box-availability.component';
import { ReportsComponent } from './components/pages/reports/reports.component';
import { AlertsComponent } from './components/pages/alerts/alerts.component';
import { LogbookComponent } from './components/pages/logbook/logbook.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Rutas para Administrador de Boxes
      { 
        path: 'reservations', 
        component: ReservationManagementComponent,
        canActivate: [authGuard],
        data: { roles: ['Administrador de Boxes'] } 
      },
      { 
        path: 'reports', 
        component: ReportsComponent,
        canActivate: [authGuard],
        data: { roles: ['Administrador de Boxes'] }  
      },
      { 
        path: 'alerts', 
        component: AlertsComponent,
        canActivate: [authGuard],
        data: { roles: ['Administrador de Boxes'] }  
      },
      // Rutas para Coordinador de Boxes
      { 
        path: 'availability', 
        component: BoxAvailabilityComponent,
        canActivate: [authGuard],
        data: { roles: ['Coordinador de Boxes'] }  
      },
      { 
        path: 'logbook', 
        component: LogbookComponent,
        canActivate: [authGuard],
        data: { roles: ['Coordinador de Boxes'] }  
      },
       // (RF-05 y RF-10 se pueden integrar en otras vistas o tener la suya)
       // Por simplicidad, la gestion de especialistas (RF-05) y notificaciones de conflicto (RF-10)
       // se manejarán dentro de 'availability' y 'reservation-management'.
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' } // Redirigir cualquier otra ruta a login
];