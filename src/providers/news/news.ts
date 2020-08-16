import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { NewsModel } from '../../models/news.model';
import { StorageService } from '../../services/storage.service';
import { ErrorResponseEnum } from '../../enums/error-response.enum';
import { AlertsMessageEnum } from '../../enums/alerts-message.enum';
import { HighlightsModel } from '../../models/highlights.model';

@Injectable()
export class NewsProvider {

  public readonly BASE_URL = `${ENV.BASE_URL}v1/client/news/`;
  constructor(
    public http: HttpClient,
    private storageService: StorageService
  ) { }

  async fetchNews(): Promise<NewsModel> {
    try {
      const token = await this.storageService.getToken();
      let header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      
      const response = await this.http.get(this.BASE_URL, { headers: header })
        .pipe(
          map(
            (data: NewsModel) => new NewsModel(data)
          )
        ).toPromise();

      return response
    } catch (error) {
      if (error && error.error) {
        if (error.error.code.toLowerCase() == ErrorResponseEnum.UserCode) throw AlertsMessageEnum.InvalidCredentials;
      }

      throw AlertsMessageEnum.GenericServiceError;
    }
  }

  async fetchHighLights(): Promise<HighlightsModel[]> {
    try {
      const token = await this.storageService.getToken();
      let header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      let url = `${this.BASE_URL}highlights`;
      const response = await this.http.get(url, { headers: header })
        .pipe(
          map(
            (data: { data: HighlightsModel[] }) => data.data
          )
        ).toPromise();

      return response;
    } catch (error) {
      if (error && error.error) {
        if (error.error.code.toLowerCase() == ErrorResponseEnum.HighLightsCode) throw AlertsMessageEnum.InvalidToken;
      }

      throw AlertsMessageEnum.GenericServiceError;
    }
  }

}
