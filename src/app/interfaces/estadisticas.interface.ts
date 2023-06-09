export interface JugadorStats {
  StatID: number;
  TeamID: number;
  PlayerID: number;
  SeasonType: number;
  Season: number;
  Name: string;
  Team: string;
  Position: string;
  Started: number;
  GlobalTeamID: number;
  Updated: string;
  Games: number;
  FantasyPoints: number;
  Minutes: number;
  Seconds: number;
  FieldGoalsMade: number;
  FieldGoalsAttempted: number;
  FieldGoalsPercentage: number;
  EffectiveFieldGoalsPercentage: number;
  TwoPointersMade: number;
  TwoPointersAttempted: number;
  TwoPointersPercentage: number;
  ThreePointersMade: number;
  ThreePointersAttempted: number;
  ThreePointersPercentage: number;
  FreeThrowsMade:number;
  FreeThrowsAttempted:number;
  FreeThrowsPercentage: number;
  OffensiveRebounds:number;
  DefensiveRebounds: number;
  Rebounds:number;
  OffensiveReboundsPercentage:number;
  DefensiveReboundsPercentage: number;
  TotalReboundsPercentage: number;
  Assists: number;
  Steals:number;
  BlockedShots:number;
  Turnovers:number;
  PersonalFouls:number;
  Points: number;
  TrueShootingAttempts:number;
  TrueShootingPercentage:number;
  PlayerEfficiencyRating: number;
  AssistsPercentage: number;
  StealsPercentage: number;
  BlocksPercentage:number;
  TurnOversPercentage: number;
  UsageRatePercentage: number;
  FantasyPointsFanDuel: number;
  FantasyPointsDraftKings:number;
  FantasyPointsYahoo:number;
  PlusMinus: number;
  DoubleDoubles:number;
  TripleDoubles: number;
  FantasyPointsFantasyDraft:number;
  IsClosed: boolean;
  LineupConfirmed: null;
  LineupStatus: string;
}
