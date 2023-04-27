import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';
import { StatsService } from '../../../services/stats.service';
import { SearchService } from '../../../services/search.service';
import { Observable, map, catchError, of } from 'rxjs';
import { Jugador } from 'src/app/interfaces/jugador.interface';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule],
})
export class CardComponent implements OnInit {
  @Input() top5: JugadorStats[];
  @Input() mejorJugador: JugadorStats;
  @Input() titulo: string;

  constructor(
    private statsService: StatsService,
    private searchService: SearchService
  ) {
    this.titulo = '';
    this.top5 = [];
    this.mejorJugador = this.top5[0];
  }

  ngOnInit(): void {}
}
