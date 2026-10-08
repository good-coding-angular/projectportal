import {EventEmitter, Type} from '@angular/core';
import {SharedEmptyComponent} from '../components/shared-empty/shared-empty.component';

export class DynamicComponent<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public moduleType?: Type<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public componentType: Type<any> = SharedEmptyComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public inputs?: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public signalInputs?: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public outputs?: { [K in keyof T]?: T[K] extends EventEmitter<any> ? T[K] : never } = {};

  public constructor(config?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moduleType?: Type<any>,
    componentType: Type<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputs?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signalInputs?: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    outputs?: { [K in keyof T]?: T[K] extends EventEmitter<any> ? T[K] : never }
  }) {
    if (config && config.moduleType) {
      this.moduleType = config.moduleType;
    }

    if (config && config.componentType) {
      this.componentType = config.componentType;
    }

    if (config && config.inputs) {
      this.inputs = config.inputs;
    }

    if (config && config.signalInputs) {
      this.signalInputs = config.signalInputs;
    }

    if (config && config.outputs) {
      this.outputs = config.outputs;
    }
  }
}
