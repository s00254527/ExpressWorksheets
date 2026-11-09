import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notBlank(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(typeof value === 'string' && value.length > 0 && value.trim().length === 0) {
        return { notBlank: true };
    }
    return null;
}