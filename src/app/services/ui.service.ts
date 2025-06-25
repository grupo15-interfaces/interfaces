import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // Una "señal" que mantiene el estado. Por defecto, el menú es visible (true).
  public sidebarVisible = signal<boolean>(true);

  constructor() { }

  // Método para cambiar el estado de visible a oculto y viceversa.
  public toggleSidebar(): void {
    this.sidebarVisible.update(value => !value);
  }
}