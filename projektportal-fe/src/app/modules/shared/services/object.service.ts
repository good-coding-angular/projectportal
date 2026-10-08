import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getAttributeFromObject(data: any, attributeName: string, ifEmptyContent: any): any {
    if (
      attributeName
      && attributeName.indexOf('.') !== -1
    ) {
      const attributeNameParts: string[] = attributeName.split('.');

      if (data[attributeNameParts[0]]) {
        const firstAttributeNamePart: string | undefined = attributeNameParts.shift();

        return this.getAttributeFromObject(data[firstAttributeNamePart ?? ''], attributeNameParts.join('.'), ifEmptyContent);
      } else {
        return ifEmptyContent;
      }
    }

    if (!data[attributeName]) {
      return ifEmptyContent;
    }

    return data[attributeName];
  }
}
