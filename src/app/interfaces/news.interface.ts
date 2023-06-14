export interface NewsArticle {
  NewsID: number;
  Source: string;
  Updated: string;
  TimeAgo: string;
  Title: string;
  Content: string;
  Url: string;
  TermsOfUse: string;
  Author: string;
  Categories: string;
  PlayerID: number;
  TeamID: number;
  Team: string;
  PlayerID2: number | null;
  TeamID2: number | null;
  Team2: string | null;
  OriginalSource: string;
  OriginalSourceUrl: string;
}
