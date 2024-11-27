import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EncodingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method === 'POST' || req.method === 'PUT') {
      const encodedBody = Object.keys(req.body || {}).reduce(
        (acc: any, key) => {
          acc[key] = encodeURIComponent(req.body[key]);
          return acc;
        },
        {}
      );
      const clonedRequest = req.clone({ body: encodedBody });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
