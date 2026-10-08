import {Component, input} from '@angular/core';
import {IconTypeEnum} from '../../models/icon-type.enum';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-shared-icon',
  templateUrl: './shared-icon.component.html',
  styleUrls: ['./shared-icon.component.scss'],
  imports: [
    FontAwesomeModule,
  ],
})
export class SharedIconComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public icon = input<any>(SolidIcons.faHome);

  public iconType = input<IconTypeEnum>(IconTypeEnum.fontAwesome);

  public description = input('');

  public getFontAwesomeIcon(): IconProp {
    return this.icon();
  }

  public isFontAwesomeIcon(): boolean {
    return this.iconType() === IconTypeEnum.fontAwesome;
  }

  public isBootstrapIcon(): boolean {
    return this.iconType() === IconTypeEnum.bootstrap;
  }
}
