import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone:true,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports:[
    RouterModule,
    NgbCollapseModule,
    RouterLink,
    CommonModule
  ]
})
export class NavBarComponent {
  isMenuCollapsed = true;
}
