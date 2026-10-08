import {EventEmitter, InputSignal} from '@angular/core';
import {FormLabelPosition} from './form-label-position.enum';
import {KeyValuePair} from './key-value-pair.class';

export interface FormComponentDeclarationInterface {
  label: InputSignal<string>;
  description: InputSignal<string>;
  name: InputSignal<string>;
  mandatory: InputSignal<boolean>;
  disabled: InputSignal<boolean>;
  labelPosition: InputSignal<FormLabelPosition>;

  formValueChangedEmitter: EventEmitter<KeyValuePair>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  placeholder?: string;
  options?: KeyValuePair[];
  type?: string;
  pattern?: string;
  patternErrorText?: string;
  acceptedDragAndDropTypes?: string[];
  dropZoneText?: string;
  accept?: string;
  maxLength?: number;
  minLength?: number;
}
