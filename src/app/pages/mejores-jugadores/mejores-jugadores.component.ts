import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { SearchService } from 'src/app/services/search.service';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { TarjetaComponent } from 'src/app/shared/components/tarjeta/tarjeta.component';

@Component({
  standalone: true,
  selector: 'app-mejores-jugadores',
  templateUrl: './mejores-jugadores.component.html',
  styleUrls: ['./mejores-jugadores.component.css'],
  imports: [CardComponent, CommonModule, TarjetaComponent, SpinnerComponent],
})
export class MejoresJugadoresComponent implements OnInit, AfterViewInit {
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
  ngAfterViewInit() {
    this.getEquipos();
  }

  getEquipos(): void {
    this.equipoService.obtenerEquiposActivos().subscribe((equipos) => {
      this.equipos = equipos;
    });
  }
  datosCargados(evento: boolean) {
    this.isLoaded = evento;
  }
}
