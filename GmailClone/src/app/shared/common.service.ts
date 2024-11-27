import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  joinWithDelimiter(arr: string[], delimiter: string): string {
    return arr
      .filter((x) => typeof x === 'string' && x.length > 0)
      .join(delimiter + ' ');
  }

  convertUtcToLocalTime(utcDateString: string): string {
    const utcDate = new Date(utcDateString);

    // Adjust the time to Asia/Kolkata timezone
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    return formatter.format(utcDate).replace(',', '');
  }
}
