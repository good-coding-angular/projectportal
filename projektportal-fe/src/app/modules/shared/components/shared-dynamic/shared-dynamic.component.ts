import {Component, input} from '@angular/core';
import {DynamicComponent} from '../../models/dynamic-component.class';
import {SharedEmptyComponent} from '../shared-empty/shared-empty.component';
import {
  SharedDynamicComponentDirective
} from '../../directives/shared-dynamic-component/shared-dynamic-component.directive';
import {
  SharedDynamicModuleComponentDirective
} from '../../directives/shared-dynamic-module-component/shared-dynamic-module-component.directive';

@Component({
  selector: 'app-shared-dynamic',
  templateUrl: './shared-dynamic.component.html',
  imports: [
    SharedDynamicComponentDirective,
    SharedDynamicModuleComponentDirective
  ],
})
export class SharedDynamicComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dynamicComponent = input<DynamicComponent<any>>(new DynamicComponent<SharedEmptyComponent>({
    componentType: SharedEmptyComponent,
  }));

  public hasDynamicComponent(): boolean {
    return !!(this.dynamicComponent());
  }

  public dynamicComponentHasModuleDeclared(): boolean {
    const dynamicComponent = this.dynamicComponent();
    if (!dynamicComponent) {
      return false;
    }

    return !!(dynamicComponent.moduleType);
  }

  public showDynamicComponent(): boolean {
    return this.hasDynamicComponent() && !this.dynamicComponentHasModuleDeclared();
  }

  public showDynamicModuleComponent(): boolean {
    return this.hasDynamicComponent() && this.dynamicComponentHasModuleDeclared();
  }
}
