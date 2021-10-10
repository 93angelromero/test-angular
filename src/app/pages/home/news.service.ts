import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '@app/shared/models/news.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getNews(searchData:News): Observable<any> {
    let language = navigator.language
    let languageFormat = language
    if (language.includes('-')) {
      const lan = language.split('-')
      languageFormat = lan[0]
    }
    return this.http
      .get(`https://newsapi.org/v2/everything?q=${searchData.search}&language=${languageFormat}&apiKey=${environment.NEWS_API_KEY}`)
  }
}
