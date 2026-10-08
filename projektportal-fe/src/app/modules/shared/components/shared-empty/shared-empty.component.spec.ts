import {ComponentFixture} from "@angular/core/testing";
import {SharedEmptyComponent} from "./shared-empty.component";
import {createComponentFixture} from "../../../../testing/create-fixture";

describe('Shared: SharedEmptyComponent', () => {
  let fixture: ComponentFixture<SharedEmptyComponent>;
  let component: SharedEmptyComponent;

  beforeEach(() => {
    fixture = createComponentFixture(
      SharedEmptyComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when testing the instance', () => {
    it('should have created an instance of the component', () => {
      expect(component).toBeTruthy();
    });
  });
});
