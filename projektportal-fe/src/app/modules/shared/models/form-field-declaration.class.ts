import {DynamicComponent} from './dynamic-component.class';

export class FormFieldDeclaration {
  public bootstrapWidth?: number;
  public bootstrapXlWidth?: number;
  public bootstrapLgWidth?: number;
  public bootstrapMdWidth?: number;
  public bootstrapXsWidth?: number;
  public bootstrapSmWidth?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formComponent?: DynamicComponent<any>;

  constructor(
    options?: {
      bootstrapWidth?: number;
      bootstrapXlWidth?: number;
      bootstrapLgWidth?: number;
      bootstrapMdWidth?: number;
      bootstrapXsWidth?: number;
      bootstrapSmWidth?: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formComponent?: DynamicComponent<any>;
    }
  ) {
    if (options?.bootstrapWidth) {
      this.bootstrapWidth = options.bootstrapWidth
    }

    if (options?.bootstrapXlWidth) {
      this.bootstrapXlWidth = options.bootstrapXlWidth
    }

    if (options?.bootstrapLgWidth) {
      this.bootstrapLgWidth = options.bootstrapLgWidth
    }

    if (options?.bootstrapMdWidth) {
      this.bootstrapMdWidth = options.bootstrapMdWidth
    }

    if (options?.bootstrapXsWidth) {
      this.bootstrapXsWidth = options.bootstrapXsWidth
    }

    if (options?.bootstrapSmWidth) {
      this.bootstrapSmWidth = options.bootstrapSmWidth
    }

    if (options?.formComponent) {
      this.formComponent = options.formComponent
    }
  }
}
