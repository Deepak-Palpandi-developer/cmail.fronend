import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { HmacService } from './hmac.service';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpCommonService<T> {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly hmacService: HmacService
  ) {}

  postData<T>(url: string, apiRoute: string, data: T): Observable<any> {
    var request: any;
    var headers: any;
    if (environment.enable_encryption) {
      const encryptedData = this.hmacService.encryptPayload(data);
      headers = this.hmacService.getHeaders(encryptedData?.cipherText);
      const hmac = this.hmacService.generateHMAC(encryptedData?.cipherText);

      request = JSON.stringify(
        `${encryptedData.cipherText}(/=/)${encryptedData.iv}(/=/)${hmac}`
      );
    } else {
      request = JSON.stringify(data);
      headers = this.hmacService.getHeadersNormal();
    }

    return this.httpClient
      .post(url + apiRoute, request, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          if (!response) return null;
          if (environment.enable_encryption) {
            const [cipherText, iv, hmac] = response.toString().split('(/=/)');
            const decrypted: any = this.hmacService.decrypt(
              cipherText,
              iv,
              hmac
            );
            return JSON.parse(
              JSON.parse(JSON.parse(JSON.stringify(decrypted)))
            );
          } else {
            return response;
          }
        }),
        catchError((error) => {
          console.error('HTTP Error:', error);
          throw error;
        }),
        finalize(() => {
          console.log('Request finalized');
        })
      );
  }

  getData<T>(url: string, apiRoute: string): Observable<any> {
    return this.httpClient.get(url + apiRoute).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('HTTP Error:', error);
        throw error;
      }),
      finalize(() => {
        console.log('Request finalized');
      })
    );
  }
}
