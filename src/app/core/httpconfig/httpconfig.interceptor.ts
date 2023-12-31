import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SnackbarData, MessageType } from '@app/shared/models/material/material.model';
import { ApiError } from '@app/shared/models/api-response/api-response';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private authenService: AuthenticationService,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');

    if (this.authenService.isAuthenticated()) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let apiError = <ApiError>error.error;
        if (apiError && (!!apiError.errorMessage || !!apiError.message)) {
          let data = <SnackbarData>{
            content: apiError.errorMessage || apiError.message,
            type: MessageType.Error
          };
        }

        return throwError(error);
      })
    );
  }
}
