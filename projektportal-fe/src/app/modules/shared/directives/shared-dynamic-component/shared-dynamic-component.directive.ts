import {
  Directive,
  input,
  ViewContainerRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  ComponentRef,
  inject,
  signal,
} from '@angular/core';
import {SharedEmptyComponent} from '../../components/shared-empty/shared-empty.component';
import {DynamicComponent} from '../../models/dynamic-component.class';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'app-shared-dynamic-component'
})
export class SharedDynamicComponentDirective implements OnDestroy, OnChanges, AfterViewInit {
  private viewContainerRef = inject(ViewContainerRef);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dynamicComponent = input<DynamicComponent<any>>(new DynamicComponent({
    componentType: SharedEmptyComponent
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private componentRef?: ComponentRef<any>;

  public ngAfterViewInit(): void {
    const dynamicComponent = this.dynamicComponent();
    const componentName = dynamicComponent && dynamicComponent.componentType.name || 'undefined';

    try {
      this.createComponent();
    } catch (e) {
      console.error('Could not compile module of dynamic component (component: %s)', componentName, e);
    }
  }

  public ngOnChanges(): void {
    if (this.componentRef) {
      this.bindVariables();
    }
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private createComponent(): void {
    window.requestAnimationFrame(() => {
      const dynamicComponent = this.dynamicComponent();
      if (dynamicComponent) {
        try {
          this.componentRef = this.viewContainerRef.createComponent(dynamicComponent.componentType);
          this.bindVariables();
        } catch (e) {
          console.error(
            'Could not instantiate dynamic component. Could it be that you declared the wrong module (component: %s)',
            dynamicComponent.componentType.name,
            e
          );
        }
      }
    });
  }

  private bindVariables(): void {
    if (this.componentRef) {
      const dynamicComponent = this.dynamicComponent();
      if (dynamicComponent?.inputs) {
        const bindingKeys = Object.keys(dynamicComponent.inputs);

        for (const bindingName of bindingKeys) {
          this.componentRef.instance[bindingName] = dynamicComponent.inputs[bindingName];
        }
      }

      if (dynamicComponent?.signalInputs) {
        const bindingKeys = Object.keys(dynamicComponent.signalInputs);

        for (const bindingName of bindingKeys) {
          this.componentRef.instance[bindingName] = signal(dynamicComponent.signalInputs[bindingName]);
        }
      }

      if (dynamicComponent?.outputs) {
        const eventKeys = Object.keys(dynamicComponent.outputs);

        for (const eventName of eventKeys) {
          this.componentRef.instance[eventName] = dynamicComponent.outputs[eventName];
        }
      }
    }
  }
}
