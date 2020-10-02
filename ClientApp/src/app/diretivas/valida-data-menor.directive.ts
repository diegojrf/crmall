import { Directive, Attribute, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validaDataMenor]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidaDataMenorDirective), multi: true }
  ]
})
export class ValidaDataMenorDirective implements Validator {

  constructor(@Attribute('validaDataMenor') public validaDataMenor: string) { }

  validate(c: AbstractControl): { [key: string]: any } {
    let data = new Date(c.value);
    data.setDate(data.getDate() + 1);
    let atual = new Date();

    if (data >= atual) {
      return {
        validaDataMenor: false
      };
    }
    return null;
  }

}
