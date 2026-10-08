import {Component, ElementRef, EventEmitter, input, model, Output, ViewChild} from '@angular/core';
import {FormLabelPosition} from '../../models/form-label-position.enum';
import {FormBase} from '../../models/form-base.class';
import {KeyValuePair} from '../../models/key-value-pair.class';
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-shared-form-input',
    templateUrl: './shared-form-input.component.html',
    styleUrls: ['./shared-form-input.component.scss'],
    imports: [
      CommonModule,
      FormsModule,
    ],
})
export class SharedFormInputComponent extends FormBase {
  public placeholder = input('');

  public type = input('text');

  public value = model('');

  public pattern = input('.*');

  public patternErrorText = input('Der String hat nicht die gewünschte Form');

  public maxLength = input(999999999999999);

  public minLength = input(0);

  public override labelPosition = input<FormLabelPosition>(FormLabelPosition.top);

  @Output()
  public override formValueChangedEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  @ViewChild('formInput')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formInput: ElementRef = {} as ElementRef<any>;

  public onChange(): void {
    if (this.formValueChangedEmitter) {
      this.formValueChangedEmitter.emit(new KeyValuePair(this.name(), this.value()));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getInputClass(): any {
    return {
      'form--input--element--inline': this.labelPosition() === FormLabelPosition.inline,
      'form--input--element--top': this.labelPosition() === FormLabelPosition.top,
    };
  }
}
