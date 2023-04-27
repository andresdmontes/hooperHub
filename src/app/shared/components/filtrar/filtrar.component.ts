import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone:true,
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.css'],
  imports:[
    NgbDropdownModule
  ]
})
export class FiltrarComponent {

}
