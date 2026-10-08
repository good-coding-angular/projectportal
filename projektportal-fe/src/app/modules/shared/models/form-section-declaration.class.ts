import {FormFieldDeclaration} from './form-field-declaration.class';

export class FormSectionDeclaration {
  public title?: string;
  public id?: string;
  public active?: boolean = true;
  public formFields: FormFieldDeclaration[] = [];
  public bootstrapWidth?: number;
  public bootstrapXlWidth?: number;
  public bootstrapLgWidth?: number;
  public bootstrapMdWidth?: number;
  public bootstrapXsWidth?: number;
  public bootstrapSmWidth?: number;

  constructor(
    options?: {
      title?: string,
      id?: string,
      active?: boolean,
      formFields: FormFieldDeclaration[],
      bootstrapWidth?: number,
      bootstrapXlWidth?: number,
      bootstrapLgWidth?: number,
      bootstrapMdWidth?: number,
      bootstrapXsWidth?: number,
      bootstrapSmWidth?: number,
    }
  ) {
    if (options?.title) {
      this.title = options.title
    }

    if (options?.id) {
      this.id = options.id
    }

    if (options?.active) {
      this.active = options.active
    }

    if (options?.formFields) {
      this.formFields = options.formFields
    }

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
  }
}
