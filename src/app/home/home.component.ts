import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JugadoresComponent } from '../pages/jugadores/jugadores.component';
import { EquiposComponent } from '../pages/equipos/equipos.component';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[
    RouterModule,
    CommonModule,
    JugadoresComponent,
    EquiposComponent,
    NavBarComponent
  ]
})
export class HomeComponent {}
