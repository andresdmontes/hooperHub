import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public TeamID: number = 0;
  ngOnInit(): void {
    if (history.state) {
      this.TeamID = history.state.id;
    }
  }
}
