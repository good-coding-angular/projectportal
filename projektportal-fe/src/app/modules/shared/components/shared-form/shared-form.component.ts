import {
  Component,
  EventEmitter,
  inject,
  input,
  model,
  OnDestroy,
  OnInit,
  output,
  Output,
  ViewChild,
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormFieldDeclaration} from '../../models/form-field-declaration.class';
import {FormSectionDeclaration} from '../../models/form-section-declaration.class';
import {HelperService} from '../../services/helper.service';
import {KeyValuePair} from '../../models/key-value-pair.class';
import {DynamicComponent} from '../../models/dynamic-component.class';
import {SharedEmptyComponent} from '../shared-empty/shared-empty.component';
import {TranslateService} from "@ngx-translate/core";
import {SharedBaseComponent} from "../shared-base/shared-base.component";
import {SharedDynamicComponent} from "../shared-dynamic/shared-dynamic.component";

@Component({
    selector: 'app-shared-form',
    templateUrl: 'shared-form.component.html',
    styleUrls: ['./shared-form.component.scss'],
    imports: [
      CommonModule,
      SharedDynamicComponent,
    ],
})
export class SharedFormComponent extends SharedBaseComponent implements OnInit, OnDestroy {
  public helperService = inject(HelperService);
  public translateService = inject(TranslateService);

  public formSections = input<FormSectionDeclaration[]>([]);

  public hasSubmitButton = input(true);

  public submitButtonText = model('');

  public hasCancelButton = input(false);

  public cancelButtonText = model('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formData = input<any>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formComponentEmitters = input<EventEmitter<any>[]>([]);

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formSubmitEmitter = new EventEmitter<any>();

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formCancelEmitter = new EventEmitter<any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formDataEmitter = output<any>();

  @ViewChild('formReference')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formReference: any;

  public formIsValid = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formComponentEmitterSubscriptions: any[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public translations: any = {};

  constructor() {
    super();

    this.subscriptions.add(
      this.translateService.get([
          'shared.components.shared-form.save',
          'shared.components.shared-form.cancel'
        ])
        .subscribe(translations => {
          this.submitButtonText.set(translations['shared.components.shared-form.save']);
          this.cancelButtonText.set(translations['shared.components.shared-form.cancel']);
        })
    );
  }

  public ngOnInit(): void {
    this.initFormChangeBehaviour();
  }

  public initFormChangeBehaviour(): void {
    const formComponentEmitters = this.formComponentEmitters();
    if (!!formComponentEmitters && formComponentEmitters.length !== 0) {
      for (const formComponentEmitter of formComponentEmitters) {
        this.formComponentEmitterSubscriptions.push(
          formComponentEmitter.subscribe(
            (data: KeyValuePair) => {
              this.helperService.saveToNestedDataBody(data.key, this.formData(), data.value);

              this.formDataEmitter.emit(this.formData());
            }
          )
        );
      }
    }
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();

    if (this.formComponentEmitterSubscriptions) {
      for (const formComponentEmitterSubscription of this.formComponentEmitterSubscriptions) {
        formComponentEmitterSubscription.unsubscribe();
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formChange(form: any): void {
    this.validateForm(form.target.form);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public submitButtonPressed(form: any): boolean {
    this.validateForm(form.target);

    if (this.formIsValid) {
      form.preventDefault();
      this.formSubmitEmitter.emit(null);

      return true;
    }

    return false;
  }

  public cancelButtonPressed(): void {
    this.formCancelEmitter.emit(null);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public validateForm(form: any): void {
    let hasOnlyValidElements = true;

    for (let i = 0; i < form.length; i++) {
      if (
        form[i.toString()].willValidate
        && !form[i.toString()].validity.valid
      ) {
        hasOnlyValidElements = false;
      }
    }

    this.formIsValid = hasOnlyValidElements;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public calculateBootstrapWidthForFormSection(section: FormSectionDeclaration): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returnValue: any = {};

    if (section.bootstrapWidth) {
      returnValue['col-' + section.bootstrapWidth] = true;
    } else if (
      !section.bootstrapXlWidth
      && !section.bootstrapLgWidth
      && !section.bootstrapMdWidth
      && !section.bootstrapXsWidth
      && !section.bootstrapSmWidth
    ) {
      returnValue['col-12'] = true;
    }

    if (section.bootstrapXlWidth) {
      returnValue['col-xl-' + section.bootstrapXlWidth] = true;
    }

    if (section.bootstrapLgWidth) {
      returnValue['col-lg-' + section.bootstrapLgWidth] = true;
    }

    if (section.bootstrapMdWidth) {
      returnValue['col-md-' + section.bootstrapMdWidth] = true;
    }

    if (section.bootstrapXsWidth) {
      returnValue['col-xs-' + section.bootstrapXsWidth] = true;
    }

    if (section.bootstrapSmWidth) {
      returnValue['col-sm-' + section.bootstrapSmWidth] = true;
    }

    return returnValue;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public calculateBootstrapWidthForFormElement(field: FormFieldDeclaration): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returnValue: any = {};

    if (field.bootstrapWidth) {
      returnValue['col-' + field.bootstrapWidth] = true;
    } else if (
      !field.bootstrapXlWidth
      && !field.bootstrapLgWidth
      && !field.bootstrapMdWidth
      && !field.bootstrapXsWidth
      && !field.bootstrapSmWidth
    ) {
      returnValue['col-12'] = true;
    }

    if (field.bootstrapXlWidth) {
      returnValue['col-xl-' + field.bootstrapXlWidth] = true;
    }

    if (field.bootstrapLgWidth) {
      returnValue['col-lg-' + field.bootstrapLgWidth] = true;
    }

    if (field.bootstrapMdWidth) {
      returnValue['col-md-' + field.bootstrapMdWidth] = true;
    }

    if (field.bootstrapXsWidth) {
      returnValue['col-xs-' + field.bootstrapXsWidth] = true;
    }

    if (field.bootstrapSmWidth) {
      returnValue['col-sm-' + field.bootstrapSmWidth] = true;
    }

    return returnValue;
  }

  public isFormSectionActive(formSection: FormSectionDeclaration): boolean {
    return formSection.active === undefined || formSection.active;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getDynamicComponent(formField: FormFieldDeclaration): DynamicComponent<any> {
    return formField.formComponent ?? new DynamicComponent<SharedEmptyComponent>({
      componentType: SharedEmptyComponent,
    });
  }
}
