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
import { ArticleComponent } from 'src/app/shared/components/article/article.component';
import { NewsArticle } from 'src/app/interfaces/news.interface';

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
    ArticleComponent,
  ],
})
export class SearchComponent {
  public searchValue: string;
  public initialValue: string;
  public filtro: string;
  public filteredPlayers: Jugador[];
  public filteredTeams: Equipo[];
  public notFound: boolean;
  public news: NewsArticle[];
  carouselPhotos: Photo[] = [
    {
      url: './../assets/img/nuggets-ring.jpg',
      title: 'Denver Nuggets: ',
      subtitle: 'NBA CHAMPIONS',
      details: `The Denver Nuggets win their first ever NBA championship after winning Miami 4-1. Led By the Serbian All-Star and 2x MVP. After defeating Minnesota, Phoenix
      and the Los Angeles Lakers of LeBron James.The team showcased an outstanding performance led by Nikola Jokic and Jamal Murray, who contributed significantly to the victory through all
      the postseason.`,
    },
    {
      url: './../assets/img/NBA Playoffs Bracket 060123.jpg',
      title: 'Playoff Table',
      details: `The NBA playoffs 22-23 have been thrilling and full of surprises, with teams causing upsets and eliminating favorites.
       There have been stellar performances from star players, with close games and key moments that have kept fans hooked to the storyline.
       As the postseason progresses, the intensity and competition intensify, leaving the possibility open for an unexpected champion.`,
    },
    {
      url: './../assets/img/embiid-mvp.jpg',
      title: 'Joel Embiid',
      subtitle: ' MVP 2023',
      details: `Due to his unstoppable dominance on both ends of the court
      , his ability to score efficiently and lead the league in rebounds,
       and his capacity to block shots, he became the most complete and dominant player of the season.`,
    },
    {
      url: './../assets/img/heat-ecf.jpg',
      title: 'Miami Heat: ',
      subtitle: 'Campeones Conferencia Este',
      details: `Miami's story is worthy of a movie, going from not being qualified for the playoffs to defeating the best team in the league and reaching the Finals.
       Will they be able to claim the title? Jimmy Butler and his teammates are determined to give the Colorado team a tough challenge.`,
    },
  ];
  constructor(private readonly _searchService: SearchService) {
    this.searchValue = '';
    this.initialValue = '';
    this.filtro = 'Players';
    this.filteredPlayers = [];
    this.filteredTeams = [];
    this.notFound = false;
    this.news = [];
  }

  ngOnInit(): void {
    this.loadNews();
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

  loadNews() {
    this._searchService.obtenerNoticias().subscribe((data) => {
      this.news = data.slice(0, 3);
    });
    console.log(this.news);
  }
}
