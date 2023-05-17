import {
  Component,
  EventEmitter,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SelectRoleComponent } from '../select-component/select-component.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.css'],
  imports: [SelectRoleComponent, CommonModule, FormsModule],
})
export class FiltrarComponent {
  @ViewChildren(NgModel) models!: QueryList<NgModel>;
  @ViewChild(NgForm) form!: NgForm;
  @Output() confSelected = new EventEmitter<void>();
  @Output() posSelected = new EventEmitter<void>();
  @Output() catSelected = new EventEmitter<void>();
  public conf: string;
  public pos: string;
  public cat: string;
  public conferences: string[];
  public positions: string[];
  public categories: string[];

  constructor() {
    this.conf = '';
    this.pos = '';
    this.cat = '';
    this.conferences = ['Eastern', 'Western', 'All'];
    this.positions = ['G', 'PG', 'SG', 'F', 'SF', 'PF', 'C'];
    this.categories = ['Points', 'Rebounds', 'Assists', 'Steals'];
  }

  selectedConf() {
    this.confSelected.emit();
  }
  selectedPos() {
    this.posSelected.emit();
  }
  selectedCat() {
    this.catSelected.emit();
  }
}
