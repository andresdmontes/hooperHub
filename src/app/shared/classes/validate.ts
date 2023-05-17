import { ValidatorFn, Validators, NgModel } from '@angular/forms';
import { ValueAccessorBase } from './valueaccessorbase';
/**
 * @description Validation of an input field
 */
export abstract class ValidateInput extends ValueAccessorBase {
  /**
   * @description sets valitadors to a model
   * @param model Ngmodel instance
   * @param required atrribute to add
   * @param pattern atrribute to add
   */
  setValidators(model: NgModel, required?: boolean, pattern?: string): void {
    model.control.setValidators(this.getValidators(required, pattern));
  }
  /**
   * @description creates validator object with the input needs
   * @param required atrribute to add
   * @param pattern atrribute to add
   * @returns validators object
   */
  getValidators(required?: boolean, pattern?: string): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (required) {
      validators.push(Validators.required);
    }
    if (pattern) {
      validators.push(Validators.pattern(pattern));
    }
    return validators;
  }
  /**
   * @description validates a model
   * @param model ngmodel instance of the model
   * @returns string with errors or null if valid
   */
  validate(model: NgModel): string | null {
    if (model.control.errors) {
      if (model.control.errors['required']) {
        return 'Este campo es obligatorio - ngmodel';
      }
      if (model.control.errors['pattern']) {
        return 'Formato Invalido - ngmodel';
      }
    }
    return null;
  }
}
