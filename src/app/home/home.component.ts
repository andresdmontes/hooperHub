import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JugadoresComponent } from '../pages/jugadores/jugadores.component';
import { EquiposComponent } from '../pages/equipos/equipos.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    JugadoresComponent,
    EquiposComponent,
    HeaderComponent,
  ],
})
export class HomeComponent {}
