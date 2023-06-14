import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/interfaces/equipo.interface';
import { Jugador } from 'src/app/interfaces/jugador.interface';
import { Stadium } from 'src/app/interfaces/stadium.interface';
import { TeamStats } from 'src/app/interfaces/teamstats.interface';
import { SearchService } from 'src/app/services/search.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [CommonModule],
})
export class DetailsComponent implements OnInit {
  public teamID: number;
  public equipo: Equipo;
  public estadisticasEquipo: TeamStats;
  public stadium: Stadium;
  public jugadores: Jugador[];
  constructor(private _search: SearchService, private _stats: StatsService) {
    this.teamID = 0;
    this.estadisticasEquipo = {
      StatID: 1,
      TeamID: 2,
      SeasonType: 3,
      Season: 2023,
      Name: 'Nombre del equipo',
      Team: 'Equipo',
      Wins: 10,
      Losses: 5,
      OpponentPosition: null,
      Possessions: 100,
      GlobalTeamID: 3,
      Updated: '2023-06-13',
      Games: 15,
      FantasyPoints: 200,
      Minutes: 2000,
      Seconds: 120,
      FieldGoalsMade: 100,
      FieldGoalsAttempted: 200,
      FieldGoalsPercentage: 0.5,
      EffectiveFieldGoalsPercentage: 0.55,
      TwoPointersMade: 80,
      TwoPointersAttempted: 160,
      TwoPointersPercentage: 0.5,
      ThreePointersMade: 20,
      ThreePointersAttempted: 40,
      ThreePointersPercentage: 0.5,
      FreeThrowsMade: 50,
      FreeThrowsAttempted: 60,
      FreeThrowsPercentage: 0.83,
      OffensiveRebounds: 50,
      DefensiveRebounds: 100,
      Rebounds: 150,
      OffensiveReboundsPercentage: null,
      DefensiveReboundsPercentage: null,
      TotalReboundsPercentage: null,
      Assists: 80,
      Steals: 30,
      BlockedShots: 20,
      Turnovers: 50,
      PersonalFouls: 70,
      Points: 400,
      TrueShootingAttempts: 250,
      TrueShootingPercentage: 0.6,
      PlayerEfficiencyRating: null,
      AssistsPercentage: null,
      StealsPercentage: null,
      BlocksPercentage: null,
      TurnOversPercentage: null,
      UsageRatePercentage: null,
      FantasyPointsFanDuel: 250,
      FantasyPointsDraftKings: 240,
      FantasyPointsYahoo: 230,
      PlusMinus: 50,
      DoubleDoubles: 3,
      TripleDoubles: 0,
      FantasyPointsFantasyDraft: 235,
      IsClosed: true,
      LineupConfirmed: null,
      LineupStatus: 'Status',
      OpponentStat: null,
    };
    this.equipo = {
      TeamID: 1,
      Key: 'equipo',
      Active: true,
      City: 'Ciudad',
      Name: 'Nombre del equipo',
      LeagueID: 2,
      StadiumID: 3,
      Conference: 'Conferencia',
      Division: 'División',
      PrimaryColor: '#FFFFFF',
      SecondaryColor: '#000000',
      TertiaryColor: '#CCCCCC',
      QuaternaryColor: '#FF0000',
      WikipediaLogoUrl: '',
      WikipediaWordMarkUrl: null,
      GlobalTeamID: 4,
      NbaDotComTeamID: 5,
      HeadCoach: '',
    };
    this.stadium = {
      StadiumID: 1,
      Active: true,
      Name: 'Capital One Arena',
      Address: '601 F St. N.W.',
      City: 'Washington',
      State: 'DC',
      Zip: '20004',
      Country: 'USA',
      Capacity: 20290,
      GeoLat: 38.898056,
      GeoLong: -77.020833,
    };
    this.jugadores = [];
  }

  ngOnInit(): void {
    if (history.state && history.state.id) {
      this.teamID = history.state.id;
    }
    this.loadTeam();
  }

  loadTeam(): void {
    this._search.equipos$.subscribe((data) => {
      const filteredEquipo = data.filter(
        (equipo) => equipo.TeamID === this.teamID
      );
      if (filteredEquipo.length > 0) {
        this.equipo = filteredEquipo[0];
        this.loadPlayers(); // Cargar jugadores después de obtener el equipo
      }
    });
    this._stats.equipoStatsSubject$.subscribe((data) => {
      const filteredStats = data.filter(
        (equipo) => equipo.TeamID === this.teamID
      );
      if (filteredStats.length > 0) {
        this.estadisticasEquipo = filteredStats[0];
      }
    });
    this._search.estadios$.subscribe((estadios) => {
      const filteredStadium = estadios.filter(
        (estadio) => estadio.StadiumID === this.equipo.StadiumID
      );
      if (filteredStadium.length > 0) {
        this.stadium = filteredStadium[0];
      }
    });
  }

  loadPlayers(): void {
    if (this.equipo) {
      this._search
        .obtenerJugadoresPorEquipo(this.equipo.Key)
        .subscribe((data) => {
          this.jugadores = data;
        });
    }
  }

  getStats(categoria: keyof TeamStats): number {
    return this.estadisticasEquipo
      ? (this.estadisticasEquipo[categoria] as number) / 82
      : 0;
  }

  getHeight(jugador: Jugador): number {
    return jugador.Height / 12;
  }
}
