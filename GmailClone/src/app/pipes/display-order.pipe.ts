import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayOrder',
})
export class DisplayOrderPipe implements PipeTransform {
  transform(array: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!Array.isArray(array) || !field) {
      return array;
    }

    const sortedArray = array
      .filter((item) => item && item[field] != null)
      .sort((a, b) => {
        if (a[field] < b[field]) {
          return order === 'asc' ? -1 : 1;
        } else if (a[field] > b[field]) {
          return order === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });

    return sortedArray;
  }
}
