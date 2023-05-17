import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public TeamID: number = 0;
  public equipo!: Equipo; //TODO: Inicializar Equipo
  constructor(private _search: SearchService) {

  }

  loadTeam() {
    this._search.equipos$.subscribe((data) => {
      this.equipo = data.filter((equipo) => equipo.TeamID === this.TeamID)[0];
    });
  }

  ngOnInit(): void {
    if (history.state) {
      this.TeamID = history.state.id;
    }
    this.loadTeam()
  }
}
