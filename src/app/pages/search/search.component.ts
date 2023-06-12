import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../shared/components/search-box/search-box.component';
import { SelectRoleComponent } from 'src/app/shared/components/select-component/select-component.component';
import { SearchService } from 'src/app/services/search.service';
import { FormsModule } from '@angular/forms';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { Photo } from 'src/app/shared/interfaces/carrouselFoto.interface';
import { CarrouselComponent } from 'src/app/shared/components/carrousel/carrousel.component';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    SearchBoxComponent,
    SelectRoleComponent,
    CarrouselComponent,
  ],
})
export class SearchComponent {
  public searchValue: string;
  public initialValue: string;
  public filtro: string;
  public filteredPlayers: Jugador[];
  public filteredTeams: Equipo[];
  public notFound: boolean;
  carouselPhotos: Photo[] = [
    {
      url: './../assets/img/AP23143137304842-1024x576.jpg',
      title: 'Denver Nuggets: ',
      subtitle: 'Campeones Conferencia Oeste',
      details: `Los denver Nuggets se proclaman vencedores del Oeste tras vencer a Minnesota, Phoenix y Los Angeles Laker de Lebron James.
      Nikola Jokic, su jugador estrella (dos veces MVP)
      lidera al equipo al triunfo en busca de su primer titulo.`,
    },
    {
      url: './../assets/img/NBA Playoffs Bracket 060123.jpg',
      title: 'Playoff cruce',
      details: `Los playoffs de la NBA 22-23 han sido emocionantes y llenos de sorpresas, con equipos dando la sorpresa y eliminando a favoritos.
       Ha habido actuaciones de jugadores estrella, con partidos reñidos y momentos clave que han mantenido a los aficionados enganchados a la trama.
       A medida que avanza la postemporada, la intensidad y la competencia aumentan, dejando abierta la posibilidad de un campeón inesperado.`,
    },
    {
      url: './../assets/img/embiid-mvp.jpg',
      title: 'Joel Embiid',
      subtitle: ' MVP 2023',
      details: `Debido a su dominio imparable en ambos extremos de la cancha, Su habilidad para anotar con eficiencia y liderar la liga en rebotes,
       y capacidad para bloquear tiros, lo convirtieron en el jugador más completo y dominante de la temporada.`,
    },
    {
      url: './../assets/img/heat-ecf.avif',
      title: 'Miami Heat: ',
      subtitle: 'Campeones Conferencia Este',
      details: `La historia de Miami es digna de película, de no estar clasificado a playoff, a ganar al mejor equipo de la liga hasta alcanzar las finales.
      ¿Serán capaces de llevarse el título? Jimmy Butler y compañía no se lo quieren poner fácil al conjunto de Colorado.`,
    },
  ];
  constructor(private readonly _searchService: SearchService) {
    this.searchValue = '';
    this.initialValue = '';
    this.filtro = 'Players';
    this.filteredPlayers = [];
    this.filteredTeams = [];
    this.notFound = false;
  }

  searchByValue($event?: string): void {
    if ($event) {
      this.notFound = false;
      this.searchValue = $event;
      console.log(this.filtro + '---' + this.searchValue);
      this.filtro === 'Players'
        ? this.filterByPlayer(this.searchValue)
        : this.filterByTeam(this.searchValue);
      if (this.filteredPlayers.length == 0 && this.filteredTeams.length == 0) {
        this.notFound = true;
      }
    } else {
      this.filteredPlayers = [];
      this.filteredTeams = [];
      console.log('esctibe un termino de busqueda');
    }
  }

  public filterByPlayer(term: string): void {
    this._searchService.jugadores$.subscribe((data) => {
      this.filteredPlayers = data
        .filter(
          (player: Jugador) =>
            player.FirstName.toLocaleLowerCase().includes(term.toLowerCase()) ||
            player.LastName.toLocaleLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 8);
      console.log(this.filteredPlayers);
    });
  }
  public filterByTeam(term: string): void {
    this._searchService.equipos$.subscribe((data) => {
      this.filteredTeams = data
        .filter(
          (team: Equipo) =>
            team.Name.toLowerCase().includes(term.toLowerCase()) ||
            team.City.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 8);
      console.log(this.filteredTeams);
    });
  }
}
