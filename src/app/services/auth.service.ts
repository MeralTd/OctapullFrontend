import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './local.storage.service';

interface User {
  id: number;
  firstName: string;
  lastName: string
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5148/api/Auth';
  private token: string | null = null;
  // private userName: string | null = null;
  // private emailAdress: string | null = null;

  private user: User | null = null;

  constructor(private http: HttpClient, private router: Router, private localStorage: LocalStorageService) {
    // this.userName = localStorage.getItem('fullName');
    // this.emailAdress = localStorage.getItem('email');

    const storedUser = this.localStorage.getItem('user');

    if (storedUser) {
      try {
        const userObj: User = JSON.parse(storedUser);
        this.user = userObj;
        console.log(userObj);
      } catch (error) {
        console.error("JSON parsing error: ", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }


  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, loginData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, registerData);
  }

  setToken(token: string): void {
    this.token = token;
    this.localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return this.token || this.localStorage.getItem('access_token');
  }

  logout(): void {
    this.token = null;
    this.localStorage.removeItem('access_token');
    this.router.navigate(['/authentication/login']);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUser() {
    return this.user
  }

  setUser(user: any): void {
    this.user = user;
    this.localStorage.setItem('user', JSON.stringify(user));
  }
}
