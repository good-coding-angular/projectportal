import {Component, EventEmitter, input, model, Output} from '@angular/core';
import {CheckboxStateEnum} from '../../models/checkbox-state.enum';
import {KeyValuePair} from '../../models/key-value-pair.class';
import {SharedCheckboxComponent} from '../shared-checkbox/shared-checkbox.component';

@Component({
  selector: 'app-shared-selection-item',
  imports: [
    SharedCheckboxComponent,
  ],
  templateUrl: './shared-selection-item.component.html',
})
export class SharedSelectionItemComponent {
  public text = input('');

  public checked = model(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emitValue = input<any>();

  @Output()
  public valueChanged: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  public getCheckedState(): CheckboxStateEnum {
    if (this.checked()) {
      return CheckboxStateEnum.checked;
    }

    return CheckboxStateEnum.none;
  }

  public checkboxClicked(): void {
    this.checked.set(!this.checked());

    if (this.valueChanged) {
      this.valueChanged.emit(
        new KeyValuePair(
          this.checked()
            ? 'checked'
            : 'unchecked',
          this.emitValue()
        )
      );
    }
  }
}
