import { Component, Input } from '@angular/core';
import { NewsArticle } from 'src/app/interfaces/news.interface';

@Component({
  standalone: true,
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: NewsArticle;

  constructor() {
    this.article = {
      NewsID: 90482,
      Source: 'RotoBaller',
      Updated: '2023-06-13T13:35:57',
      TimeAgo: '19 hours ago',
      Title: 'Nikola Jokic Voted Finals MVP',
      Content:
        'Denver Nuggets center Nikola Jokic was unanimously voted the 2023 NBA Finals MVP after the team secured the championship title with a 94-89 victory over Miami Monday. The Joker had 28 points, 16 rebounds, four assists and one block in the final game, shooting an extremely efficient 12-for-16 from the field. He averaged a sensational 30.2 points, 14.0 rebounds and 7.2 assists in the series, and became the first player in history to lead all players in points, rebounds and assists during a single postseason. Jokic broke records all over the place in 2022-23 and it should continue for a long time, with the Serbian giant having turned 28 only a few months ago.',
      Url: 'https://www.rotoballer.com/player-news/nikola-jokic-voted-finals-mvp/1190090',
      TermsOfUse:
        "RotoBaller Premium News feeds are provided for commercial use and in accordance to the terms set forth within your SportsDataIO's commercial agreement. Please contact sales@sportsdata.io with any questions.",
      Author: 'Staff',
      Categories: '',
      PlayerID: 20001441,
      TeamID: 20,
      Team: 'DEN',
      PlayerID2: null,
      TeamID2: null,
      Team2: null,
      OriginalSource: 'ESPN',
      OriginalSourceUrl: 'https://www.espn.com/nba/boxscore/_/gameId/401544850',
    };
  }
}
