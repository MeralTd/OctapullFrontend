import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:5148/api/Meetings';

  constructor(private http: HttpClient) {}

  createMeeting(meeting: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add`, meeting);
  }

  getMeetings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAll`);
  }

  updateMeeting(id: number, meeting: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, meeting);
  }

  deleteMeeting(id: number, meetingId?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Delete/${id}`,null);
  }
}
