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
  imports: [CommonModule, FormsModule, SearchBoxComponent, SelectRoleComponent, CarrouselComponent],
})
export class SearchComponent {
  public searchValue: string;
  public initialValue: string;
  public filtro: string;
  public filteredPlayers: Jugador[];
  public filteredTeams: Equipo[];
  public notFound: boolean;
  carouselPhotos: Photo[] = [
    { url: 'path/to/photo1.jpg', title: 'Foto 1' },
    { url: 'path/to/photo2.jpg', title: 'Foto 2' },
    { url: 'path/to/photo3.jpg', title: 'Foto 3' }
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
        .filter((team: Equipo) =>
          team.Name.toLowerCase().includes(term.toLowerCase()) || team.City.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 8);
      console.log(this.filteredTeams);
    });
  }
}
