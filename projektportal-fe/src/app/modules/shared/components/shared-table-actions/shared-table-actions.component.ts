import {Component, EventEmitter, input, Output, ChangeDetectionStrategy} from "@angular/core";

@Component({
  selector: 'app-shared-table-actions',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './shared-table-actions.component.html',
})
export class SharedTableActionsComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public id = input<any>();

  public hasEditButton = input(true);

  public hasDeleteButton = input(true);

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public edit = new EventEmitter<any>();

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public delete = new EventEmitter<any>();

  public triggerEdit(): void {
    if (this.edit) {
      this.edit.emit(this.id());
    }
  }

  public triggerDelete(): void {
    if (this.delete) {
      this.delete.emit(this.id());
    }
  }
}
