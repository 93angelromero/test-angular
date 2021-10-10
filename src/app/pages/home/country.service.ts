import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '@app/shared/models/country.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getCountry(ipSearch:Country):Observable<any> {
    return this.http
      .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${environment.ABSTRACT_API_KEY}&ip_address=${ipSearch.ip}`)
  }
}
