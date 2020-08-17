import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV, header } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AlertsMessageEnum } from '../../enums/alerts-message.enum';
import { ErrorResponseEnum } from '../../enums/error-response.enum';
import { Platform } from 'ionic-angular';



@Injectable()
export class UserProvider {

  public readonly BASE_URL = `${ENV.BASE_URL}v1/client/auth/`;

  constructor(
    public http: HttpClient,
    private platform: Platform
  ) { }

  async signIn(body: UserModel): Promise<any> {
    try {
      let url = `${this.BASE_URL}signin`;
      const response = await this.http.post(url, body, { headers: header })
        .pipe(
          map(
            (data: { token: string }) => data.token
          )
        ).toPromise();

      return response;
    } catch (error) {
      if (error && error.error) {
        if (error.error.code && error.error.code.toLowerCase() == ErrorResponseEnum.UserCode) throw AlertsMessageEnum.InvalidCredentials;
      }

      throw AlertsMessageEnum.GenericServiceError;
    }
  }

  async signUp(body: UserModel): Promise<string> {
    try {
      let url = `${this.BASE_URL}signup`;
      const response = await this.http.post(url, body, { headers: header })
        .pipe(
          map(
            (data: { token: string }) => data.token
          )
        ).toPromise();

      return response;
    } catch (error) {
      if (error && error.error && error.error.errors) {
        let message = '';
        error.error.errors.forEach((e: Errors) => {
          if (e.code.toLowerCase() == ErrorResponseEnum.Blank && e.field.toLowerCase() == ErrorResponseEnum.Password)
            message += AlertsMessageEnum.BlankPassword + '<br>';
          if (e.code.toLowerCase() == ErrorResponseEnum.Blank && e.field.toLowerCase() == ErrorResponseEnum.Name)
            message += AlertsMessageEnum.BlankName + '<br>';
          if (e.code.toLowerCase() == ErrorResponseEnum.Blank && e.field.toLowerCase() == ErrorResponseEnum.Email)
            message += AlertsMessageEnum.BlankEmail + '<br>';
          if (e.code.toLowerCase() == ErrorResponseEnum.Invalid)
            message += AlertsMessageEnum.InvalidEmail + '<br>';
          if (e.code.toLowerCase() == ErrorResponseEnum.Taken)
            message += AlertsMessageEnum.EmailTaken + '<br>';
        });
        throw message;
      }

      throw AlertsMessageEnum.GenericServiceError;
    }
  }

}

interface Errors {
  code: string,
  field: string,
  message: string,
}
// THIS CODE FIXES THE CORS PROBLEM IN DEVICE
// if (this.platform.is('cordova')) {
    //   return new Promise(async (resolve, reject) => {
    //     let url = `${this.BASE_URL}signin`;
    //     const http = await (<any>window).cordova.plugin.http;
    //     await http.sendRequest(url, {
    //       method: 'post',
    //       data: body,
    //       params: {},
    //       headers: {'Content-Type': 'application/json'},
    //       responseType: 'text'
    //     }, (response) => {
    //       let data = JSON.parse(response.data);
    //       console.log(data);
    //       resolve(data);
    //     }, error => {
    //       console.log(error);
    //       reject(AlertsMessageEnum.GenericServiceError);
    //     })
    //   });

    // } else {