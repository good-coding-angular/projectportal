import {Component, EventEmitter, input, model, Output} from '@angular/core';
import {CheckboxStateEnum} from '../../models/checkbox-state.enum';
import {IconTypeEnum} from '../../models/icon-type.enum';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import {SharedIconComponent} from '../shared-icon/shared-icon.component';

@Component({
  selector: 'app-shared-checkbox',
  imports: [
    SharedIconComponent,
  ],
  templateUrl: './shared-checkbox.component.html',
})
export class SharedCheckboxComponent {
  public checked = model<CheckboxStateEnum>(CheckboxStateEnum.none);

  public hasThreeStates = input(false);

  public disabled = input(false);

  @Output()
  public valueChanged: EventEmitter<CheckboxStateEnum> = new EventEmitter<CheckboxStateEnum>();

  public getIcon(): RegularIcons.IconDefinition | SolidIcons.IconDefinition {
    switch (this.checked()) {
      case CheckboxStateEnum.none:
        return this.getUncheckedIcon();
      case CheckboxStateEnum.checked:
        return this.getCheckedIcon();
      case CheckboxStateEnum.allChecked:
        return this.getAllCheckedIcon();
      default:
        return this.getUncheckedIcon();
    }
  }

  public getCheckedIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faCheckSquare;
  }

  public getUncheckedIcon(): RegularIcons.IconDefinition {
    return RegularIcons.faSquare;
  }

  public getAllCheckedIcon(): RegularIcons.IconDefinition {
    return RegularIcons.faMinusSquare;
  }

  public onCheckboxClick(): void {
    if (!this.disabled()) {
      switch (this.checked()) {
        case CheckboxStateEnum.none:
          this.checked.set(CheckboxStateEnum.checked);

          break;
        case CheckboxStateEnum.checked:
          if (this.hasThreeStates()) {
            this.checked.set(CheckboxStateEnum.allChecked);
          } else {
            this.checked.set(CheckboxStateEnum.none);
          }

          break;
        case CheckboxStateEnum.allChecked:
          this.checked.set(CheckboxStateEnum.none);

          break;
        default:
          this.checked.set(CheckboxStateEnum.none);
      }

      if (this.valueChanged) {
        this.valueChanged.emit(this.checked());
      }
    }
  }

  public getIconType(): IconTypeEnum {
    return IconTypeEnum.fontAwesome;
  }
}
