import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { SearchService } from 'src/app/services/search.service';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { TeamCard } from 'src/app/shared/components/team card/teamcard.component';

@Component({
  standalone: true,
  selector: 'app-mejores-equipos',
  templateUrl: './mejores-equipos.component.html',
  styleUrls: ['./mejores-equipos.component.css'],
  imports: [TeamCard, CommonModule, SpinnerComponent],
})
export class MejoresEquiposComponent implements OnInit{
  @ViewChildren(CardComponent) appCards!: QueryList<CardComponent>;

  public equipos: Equipo[];
  public isLoaded;
  public titulos: string[];

  constructor(private equipoService: SearchService) {
    (this.equipos = []),
      (this.titulos = [
        'Puntos',
        'Rebotes',
        'Asistencias',
        'Robos',
        'Tapones',
        'Turnovers',
      ]),
      (this.isLoaded = false);
  }
  ngOnInit() {
    this.equipoService.equipos$.subscribe((data)=>{
      this.equipos= data;
    })
  }
  datosCargados(evento: boolean) {
    setTimeout(() => {
      this.isLoaded = evento;
    }, 800);
  }

}
