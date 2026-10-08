import {SharedSelectionItemComponent} from './shared-selection-item.component';
import {EventEmitter} from '@angular/core';
import {KeyValuePair} from '../../models/key-value-pair.class';
import {CheckboxStateEnum} from '../../models/checkbox-state.enum';

describe('Shared: Selection Item Component', () => {
  let component: SharedSelectionItemComponent;

  beforeAll(() => {
    component = new SharedSelectionItemComponent();
  });

  describe('when testing getCheckedState', () => {
    describe('when checked is set to true', () => {
      beforeEach(() => {
        component.checked = true;
      });

      it('should return CheckboxStateEnum.CHECKED', () => {
        expect(component.getCheckedState()).toBe(CheckboxStateEnum.checked);
      });
    });

    describe('when checked is set to false', () => {
      beforeEach(() => {
        component.checked = false;
      });

      it('should return CheckboxStateEnum.NONE', () => {
        expect(component.getCheckedState()).toBe(CheckboxStateEnum.none);
      });
    });
  });

  describe('when testing checkboxClicked', () => {
    describe('when valueChanged is defined', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let subscription: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let emittedValue: any;

      beforeAll(() => {
        subscription = component.valueChanged.subscribe((data: KeyValuePair) => {
          emittedValue = data;
        });

        component.checked = true;
        component.emitValue = 'test';

        component.checkboxClicked();
        component.checkboxClicked();
        component.checkboxClicked();
      });

      afterAll(() => {
        subscription.unsubscribe();
      });

      describe('when checked is set to true', () => {
        it('should have altered the checked state', () => {
          expect(component.checked).toBe(false);
        });

        it('should have have a unchecked key in the emitted Value', () => {
          expect(emittedValue.key).toEqual('unchecked');
        });

        it('should have a value of test', () => {
          expect(emittedValue.value).toEqual('test');
        });
      });
    });

    describe('when valueChanged is undefined', () => {
      beforeAll(() => {
        component.valueChanged = new EventEmitter<KeyValuePair>();

        component.checked = true;
        component.emitValue = 'test';

        component.checkboxClicked();
      });

      describe('when checked is set to true', () => {
        it('should have altered the checked state', () => {
          expect(component.checked).toBe(false);
        });
      });
    });
  });
});
