import { ControlValueAccessor } from '@angular/forms';

/**
 *@description Value accesor base class to extend
 */
export abstract class ValueAccessorBase implements ControlValueAccessor {
  value = '';
  onChange: any = () => undefined;
  onTouched: any = () => undefined;

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
