import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports:[
    RouterModule
  ]
})
export class NavBarComponent {

}
