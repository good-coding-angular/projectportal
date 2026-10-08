import {SortOrder} from './sort-order.enum';
import {HelperService} from '../services/helper.service';

export class Sorting {
  public title?: string;
  public nameInData?: string;
  public order: SortOrder = SortOrder.none;

  constructor(
    public helperService: HelperService
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sortData(data: any[]): any[] {
    if (data === undefined || data === null || data.length === 0) {
      return [];
    }

    return this.helperService.sortJson(this.nameInData ?? '', data, this.order);
  }
}
