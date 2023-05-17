import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  forwardRef
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { ValidateInput } from '../../classes/validate';

/**
 *@description select role component
 */
@Component({
  standalone: true,
  selector: 'app-select',
  templateUrl: './select-component.component.html',
  styleUrls: ['./select-component.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectRoleComponent),
      multi: true
    }
  ]
})
export class SelectRoleComponent extends ValidateInput implements AfterViewInit {
  @ViewChild(NgModel) model!: NgModel;
  @Output() rolSelect = new EventEmitter<string>();
  @Input() required!: boolean;
  @Input() placeholder = '';
  @Input() options: string[] = [];
  @Input() name = '';
  public isMenuOpen = false;
  public error = false;
  public errorMsg: string | null = '';

  /**
   * @description constructor
   * @param  _elementRef reference to the element
   */
  constructor(private _elementRef: ElementRef) {
    super();
  }
  /**
   *@description gets validators for this class from extended class
   */
  ngAfterViewInit(): void {
    this.setValidators(this.model, this.required);
  }

  /**
   *@description toggles select menu
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * @description registers selected option value
   * @param option option selected
   */
  selectOption(option: string): void {
    this.value = option;
    this.toggleMenu();
    this.onChange(option);
    setTimeout(() => {
      if (this.validate(this.model) != null) {
        this.error = true;
        this.errorMsg = this.validate(this.model);
      } else {
        this.writeValue(option);
        this.error = false;
      }
    }, 50);
  }

  /**
   * @description manages click event out of this component
   * @param event click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isMenuOpen = false;
    } else {
      document.addEventListener('click', this.handleOutsideClick);
    }
  }

  handleOutsideClick = (event: MouseEvent): void => {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      if (this.validate(this.model) != null) {
        this.error = true;
        this.errorMsg = this.validate(this.model);
        this.isMenuOpen = false;
      } else {
        this.error = false;
      }
      this.isMenuOpen = false;
      document.removeEventListener('click', this.handleOutsideClick);
    }
  };
}
