import {Injectable} from '@angular/core';
import {SortOrder} from '../models/sort-order.enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isNullOrEmpty(obj: any): boolean {
    return (
      !obj
      || (
        (
          (typeof obj === 'string')
          || (obj instanceof Array)
        )
        && obj.length <= 0
      )
      || (this.isObject(obj) && obj.length <= 0)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isObject(value: any): boolean {
    if (value === null) {
      return false;
    }

    return (typeof value === 'object');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isArray(obj: any): boolean {
    return Array.isArray(obj);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isString(value: any): boolean {
    return (typeof value === 'string' || value instanceof String);
  }

  public capitalizeFirstLetter(wordOrSentence: string): string {
    return wordOrSentence.replace(/(^|\s)[a-z]/g, (f) => f.toUpperCase());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNestedDataBody(elemName: string, dataBody: any): any {
    const splittedElemName: string[] = elemName.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let returnValue: any = dataBody;

    for (const currentElemName of splittedElemName) {
      if (this.isNullOrEmpty(returnValue)) {
        return '';
      }

      returnValue = returnValue[currentElemName];
    }

    if (this.isNullOrEmpty(returnValue)) {
      return '';
    }

    return returnValue;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public saveToNestedDataBody(elemName: string, dataBody: any, value: any): void {
    const splittedElemName: string[] = elemName.split('.');

    if (splittedElemName.length === 1) {
      dataBody[elemName] = value;
    } else {
      const firstIndex = splittedElemName[0];

      if (!dataBody[firstIndex]) {
        dataBody[firstIndex] = {};
      }

      splittedElemName.shift();

      this.saveToNestedDataBody(splittedElemName.join('.'), dataBody[firstIndex], value);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sortJson(byField: string, data: any[], sortOrder: SortOrder): any {
    return data.sort((a, b) => {
      let returnValue = 0;
      const valA = this.getNestedDataBody(byField, a).toUpperCase();
      const valB = this.getNestedDataBody(byField, b).toUpperCase();

      if (valA > valB) {
        returnValue = 1;
      }

      if (valA === valB) {
        returnValue = 0;
      }

      if (valA < valB) {
        returnValue = -1;
      }

      if (sortOrder === SortOrder.desc) {
        return returnValue * -1;
      }

      return returnValue;
    });
  }
}
