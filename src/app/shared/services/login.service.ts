import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrl } from './api-url';
import { UserContextModel, TokenModel } from '@app/shared/models/user/user.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import * as jwt from 'jsonwebtoken';

export interface ILoginInterface {
  onLogin(userContext: UserContextModel): Observable<Object>;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginInterface {
  constructor(private http: HttpClient) {}
  token = new BehaviorSubject<TokenModel>(undefined);

  onLogin(userContext: UserContextModel): Observable<Object> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = {
      headers: headers
    };

    // const params = new HttpParams()
    //   .set('username', userContext.username)
    //   .set('password', userContext.password)
    //   .set('grant_type', 'password');
    // let body = params.toString();

    // return this.http.post(ApiUrl.Login, body, options).pipe(
    //   map(res => {
    //       return res;
    //   })
    // );
    
    // fake jwt token exp 1hour
    let token = jwt.sign({
      data: {
        fullName: 'admin',
        email: 'admin_coretemplate@gmail.com',
        role: 1,
        roleName: 'admin',
      }
    }, 'secret', { expiresIn: 60 * 60 })
    let response = {
      access_token: token,
      expires_in: 3600,
      token_type: 'Bearer'
    }
    if(userContext.username == 'admin' && userContext.password == '123456') {
      this.token.next(response)
    } else {
      this.token.next(null)
    }
    return this.token;
  }
}
