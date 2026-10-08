import {Component, inject, input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {RouterModule} from "@angular/router";

@Component({
    selector: 'app-public-link-base',
    templateUrl: './public-link-base.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      RouterModule,
    ],
})
export class PublicLinkBaseComponent {
  public router = inject(Router);

  public routerLink = input(['/']);

  public target = input<string | undefined>();

  public linkText = input<string>('');

  public showLinkText = input<boolean>(true);

  public linkTextToUpperCase = input<boolean>(false);

  public linkClass = input<string>('');

  public useOverflowEllipsis = input<boolean>(false);

  public subscriptions = new Subscription();

  public getLinkText(): string {
    return this.linkTextToUpperCase()
      ? this.linkText().toUpperCase()
      : this.linkText();
  }

  public getOuterCssClass(): Record<string, boolean> {
    return {
      'public-link-base__link-outer--use-overflow-ellipsis': this.useOverflowEllipsis(),
    };
  }

  public getInnerCssClass(): Record<string, boolean> {
    return {
      'public-link-base__link-inner--use-overflow-ellipsis': this.useOverflowEllipsis(),
    };
  }
}
