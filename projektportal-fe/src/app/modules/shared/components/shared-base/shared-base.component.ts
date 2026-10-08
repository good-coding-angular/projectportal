import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-base',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './shared-base.component.html'
})
export class SharedBaseComponent implements OnDestroy {
  public subscriptions = new Subscription();

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
