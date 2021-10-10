import { Injectable } from '@angular/core';
import { Register, RegisterResponse } from '@app/shared/models/register.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient, private router: Router) { }

  register(registerData:Register):Observable<RegisterResponse | void> {
    return this.http
      .post<RegisterResponse>(`${environment.API_URL}/users`, registerData)
      .pipe(
        map((res:RegisterResponse) => {
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  private handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = 'An error occured retrienviend data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
