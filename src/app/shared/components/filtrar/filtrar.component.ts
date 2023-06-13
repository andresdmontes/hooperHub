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
  styleUrls: ['./filtrar.component.scss'],
  imports: [SelectRoleComponent, CommonModule, FormsModule],
})
export class FiltrarComponent {
  @ViewChildren(NgModel) models!: QueryList<NgModel>;
  @ViewChild(NgForm) form!: NgForm;
  @Output() confSelected = new EventEmitter<void>();
  @Output() posSelected = new EventEmitter<void>();
  @Output() catSelected = new EventEmitter<void>();
  @Output() modeSelected = new EventEmitter<void>();
  @Output() aptoSelected = new EventEmitter<void>();
  public conf: string;
  public pos: string;
  public cat: string;
  public mode: string;
  public apto: string;
  public conferences: string[];
  public positions: string[];
  public categories: string[];
  public visualizar: string[];
  public elegible: string[];
  toggleValue = 'qualifiers';

  constructor() {
    this.conf = '';
    this.pos = '';
    this.cat = '';
    this.mode = '';
    this.apto = '';
    this.conferences = ['Eastern', 'Western', 'All'];
    this.positions = ['PG', 'SG', 'SF', 'PF', 'C'];
    this.categories = ['Points', 'Rebounds', 'Assists', 'Steals'];
    this.visualizar = ['Total', 'Per Game'];
    this.elegible = ['+65 games', 'All'];
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
  selectedMode() {
    this.modeSelected.emit();
  }
  selectedApto() {
    this.aptoSelected.emit();
  }
}
