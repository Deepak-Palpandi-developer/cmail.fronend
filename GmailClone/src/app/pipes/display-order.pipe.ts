import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayOrder',
})
export class DisplayOrderPipe implements PipeTransform {
  transform(array: any[], key: string, isAscending: boolean = true): any[] {
    if (!Array.isArray(array) || !key) {
      return array; // Return the array as-is if not valid
    }

    return array.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (valA == null || valB == null) return 0; // Handle null/undefined

      const comparison = valA > valB ? 1 : valA < valB ? -1 : 0;
      return isAscending ? comparison : -comparison;
    });
  }
}
