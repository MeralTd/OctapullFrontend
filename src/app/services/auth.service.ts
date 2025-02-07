import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5148/api/Auth';

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, loginData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, registerData);
  }

}
