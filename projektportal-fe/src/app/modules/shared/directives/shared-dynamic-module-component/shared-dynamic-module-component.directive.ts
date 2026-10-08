import {
  Directive,
  input,
  ViewContainerRef,
  AfterViewInit,
  Compiler,
  OnDestroy,
  OnChanges,
  Injector,
  Type,
  NgModuleRef,
  ComponentRef,
  inject,
  signal,
} from '@angular/core';
import {DynamicComponent} from '../../models/dynamic-component.class';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modules: Map<Type<any>, NgModuleRef<any>> = new Map<Type<any>, NgModuleRef<any>>();

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'app-shared-dynamic-module-component',
})
export class SharedDynamicModuleComponentDirective implements OnDestroy, OnChanges, AfterViewInit {
  private viewContainerRef = inject(ViewContainerRef);
  private compiler = inject(Compiler);
  private injector = inject(Injector);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dynamicComponent = input<DynamicComponent<any>>(new DynamicComponent<any>());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private componentRef?: ComponentRef<any>;

  public ngAfterViewInit(): void {
    const dynamicComponent = this.dynamicComponent();
    const moduleName = dynamicComponent.moduleType && dynamicComponent.moduleType.name || 'undefined';
    const componentName = dynamicComponent && dynamicComponent.componentType.name || 'undefined';

    if (dynamicComponent?.moduleType) {
      let module = modules.get(dynamicComponent.moduleType);

      if (module) {
        this.createComponent(module);
      } else {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const factory = this.compiler.compileModuleSync(dynamicComponent.moduleType as Type<any>);

          modules.set(dynamicComponent.moduleType, module = factory.create(this.injector));
          this.createComponent(module);
        } catch (e) {
          console.error(
            'Could not compile module of dynamic component (module: %s, component: %s)',
            moduleName,
            componentName,
            e
          );
        }
      }
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private createComponent(module: NgModuleRef<any>): void {
    window.requestAnimationFrame(() => {
      const dynamicComponent = this.dynamicComponent();
      if (dynamicComponent) {
        try {
          this.componentRef = this.viewContainerRef.createComponent(
            dynamicComponent.componentType,
            {
              ngModuleRef: module
            }
          );
          this.bindVariables();
        } catch (e) {
          console.error(
            'Could not instantiate dynamic component. Could it be that you declared the wrong module (module: %s, component: %s)',
            dynamicComponent.moduleType
              ? dynamicComponent.moduleType.name
              : 'moduleType.name is undefined',
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
