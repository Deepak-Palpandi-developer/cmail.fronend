import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HmacService {
  encryptPayload(payload: any): { cipherText: string; iv: string } {
    const jsonPayload = JSON.stringify(payload);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(
      jsonPayload,
      CryptoJS.enc.Utf8.parse(environment.hmac_secret_key),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return {
      cipherText: encrypted.toString(),
      iv: CryptoJS.enc.Base64.stringify(iv),
    };
  }

  generateHMAC(encryptedData: string): string {
    const hmac = CryptoJS.HmacSHA256(
      encryptedData,
      environment.hmac_secret_key
    );
    return CryptoJS.enc.Base64.stringify(hmac);
  }

  getHeaders(encryptedData: string): HttpHeaders {
    const hmac = this.generateHMAC(encryptedData);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, X-Auth-Token, content-type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      Authorization: `HMAC ${hmac}`,
    });
  }

  getHeadersNormal(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, X-Auth-Token, content-type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
  }

  decrypt(encryptedData: string, iv: string, hmac: string): string | null {
    if (!this.verifyHmac(encryptedData, iv, hmac)) {
      console.error('HMAC verification failed. Data might be tampered with.');
      return null;
    }

    const key = CryptoJS.enc.Utf8.parse(environment.hmac_secret_key);
    const ivBytes = CryptoJS.enc.Base64.parse(iv);

    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  private verifyHmac(encryptedData: string, iv: string, hmac: string): boolean {
    const combinedData = `${encryptedData}:${iv}`;
    const computedHmac = CryptoJS.HmacSHA256(
      combinedData,
      environment.hmac_secret_key
    ).toString(CryptoJS.enc.Base64);
    return computedHmac === hmac;
  }
}
