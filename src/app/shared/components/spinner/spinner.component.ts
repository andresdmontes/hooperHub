import { Component } from '@angular/core';

/**
 *
 */
@Component({
  standalone: true,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  visible = false;

  /**
   *@description muestra spinner
   */
  mostrar(): void {
    this.visible = true;
  }

  /**
   *@description oculta spinner
   */
  ocultar(): void {
    this.visible = false;
  }
}
