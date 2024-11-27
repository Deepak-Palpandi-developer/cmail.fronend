import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSharedService {
  private previousSignUpDatea: any;

  setpreviousSignUpData(data: any) {
    this.previousSignUpDatea = data;
  }

  getpreviousSignUpDatea() {
    return this.previousSignUpDatea;
  }
}
