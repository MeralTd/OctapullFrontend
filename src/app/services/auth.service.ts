import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5148/api/Auth';
  private token: string | null = null;
  private userName: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.userName = localStorage.getItem('fullName');
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, loginData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, registerData);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('access_token');
    this.router.navigate(['/authentication/login']);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserName() {
    return this.userName;
  }

  setUserName(fulName: string): void {
    this.userName = fulName;
    localStorage.setItem('fullName', fulName);
  }
}
