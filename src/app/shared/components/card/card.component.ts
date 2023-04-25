import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { JugadorStats } from 'src/app/interfaces/estadisticas.interface';

@Component({
  standalone:true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports:[
    CommonModule
  ]
})
export class CardComponent implements OnInit{
@Input() datos:JugadorStats[];
@Input() titulo:string;

constructor(){
  this.datos=[];
  this.titulo='';

}

ngOnInit(): void {

}

}
