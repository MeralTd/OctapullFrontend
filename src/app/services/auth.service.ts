import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {
    // this.userName = localStorage.getItem('fullName');
    // this.emailAdress = localStorage.getItem('email');

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser) as User;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        this.user = null;
      }
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

  getUser() {
    return this.user;
    // return { user: { userName: this.userName, email: this.emailAdress } };
  }

  setUser(user: any): void {
    // this.userName = user.firstName + ' '+ user.lastName;
    // this.emailAdress = user.email;
    // localStorage.setItem('fullName', user.firstName + ' '+ user.lastName);
    // localStorage.setItem('email', user.email);

    this.user = user;
    localStorage.setItem('user', user)
  }
}
