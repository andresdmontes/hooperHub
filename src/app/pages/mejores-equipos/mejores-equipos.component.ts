import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { SearchService } from 'src/app/services/search.service';
import { StatsService } from 'src/app/services/stats.service';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-mejores-equipos',
  templateUrl: './mejores-equipos.component.html',
  styleUrls: ['./mejores-equipos.component.css'],
  imports: [CardComponent, CommonModule, SpinnerComponent],
})
export class MejoresEquiposComponent {
  @ViewChildren(CardComponent) appCards!: QueryList<CardComponent>;

  equipos: Equipo[];
  isLoaded;
  titulos: string[];

  constructor(private equipoService: SearchService) {
    (this.equipos = []),
      (this.titulos = [
        'Puntos',
        'Rebotes',
        'Asistencias',
        'Robos',
        'Tapones',
        'Minutos',
      ]),
      (this.isLoaded = false);
  }
  ngOnInit() {}
  ngAfterViewInit() {}

  datosCargados(evento: boolean) {
    setTimeout(() => {
      this.isLoaded = evento;
    }, 1000);
  }
}
