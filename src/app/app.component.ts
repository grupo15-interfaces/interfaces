import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  // Esta línea es la más importante. Debe tener el router-outlet.
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'red-salud-app';
}