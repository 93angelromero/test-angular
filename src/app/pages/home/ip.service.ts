import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http:HttpClient) { }

  getIp():Observable<any> {
    return this.http
      .get(`https://ipinfo.io/json?token=${environment.IPINFO_API_KEY}`)
  }
}
