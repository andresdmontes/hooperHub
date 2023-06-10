import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, CommonModule, NavBarComponent],
})
export class HeaderComponent {
  getImageUrl(): string {
    if (window.innerWidth <= 768) {
      return './../../assets/logos/logo azul.png';
    } else {
      return './../../assets/logos/letras lado.png';
    }
  }
}
