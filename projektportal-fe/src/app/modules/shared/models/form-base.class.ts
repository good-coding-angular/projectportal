import {FormLabelPosition} from './form-label-position.enum';
import {FormComponentDeclarationInterface} from './form-component-declaration.interface';
import {Directive, EventEmitter, input} from '@angular/core';
import {KeyValuePair} from './key-value-pair.class';

@Directive()
export class FormBase implements FormComponentDeclarationInterface {
  public label = input('');
  public description = input('');
  public name = input('');
  public mandatory = input(false);
  public disabled = input(false);
  public labelPosition = input<FormLabelPosition>(FormLabelPosition.none);

  public formValueChangedEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  public isLabelTop(): boolean {
    return this.labelPosition() === FormLabelPosition.top;
  }

  public isLabelInline(): boolean {
    return this.labelPosition() === FormLabelPosition.inline;
  }
}
