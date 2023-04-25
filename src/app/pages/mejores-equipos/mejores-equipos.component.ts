import { Component } from '@angular/core';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  standalone:true,
  selector: 'app-mejores-equipos',
  templateUrl: './mejores-equipos.component.html',
  styleUrls: ['./mejores-equipos.component.css'],
  imports:[
    CardComponent
  ]
})
export class MejoresEquiposComponent {

}
