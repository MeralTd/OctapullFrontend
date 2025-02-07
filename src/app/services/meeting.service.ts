import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:5148/api/Meetings';

  constructor(private http: HttpClient) {}


  getMeetings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAll`);
  }


  getMeetingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Get/${id}`);
  }

  createMeeting(meeting: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add`, meeting);
  }


  updateMeeting(meeting: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Update`, meeting);
  }

  deleteMeeting(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Delete/${id}`,null);
  }

  cancelMeeting(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/CancelMeeting/${id}`,null);
  }
}
