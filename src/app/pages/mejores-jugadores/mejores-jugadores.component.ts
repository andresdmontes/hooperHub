import { Component } from '@angular/core';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  standalone:true,
  selector: 'app-mejores-jugadores',
  templateUrl: './mejores-jugadores.component.html',
  styleUrls: ['./mejores-jugadores.component.css'],
  imports:[
    CardComponent
  ]
})
export class MejoresJugadoresComponent {

}
