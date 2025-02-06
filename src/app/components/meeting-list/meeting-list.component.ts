import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
interface Meeting {
  id: string;
  meetingName: string;
  startDate: string;
  endDate: string;
  description: string;
  document: string | null;
}

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  imports: [MaterialModule]
})
export class MeetingListComponent implements OnInit {
  meetings: Meeting[] = [];
  displayedColumns: string[] = ['meetingName', 'startDate', 'endDate', 'description', 'actions']; // Burada gösterilecek kolonları belirliyoruz

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMeetings();
  }

  getMeetings(): void {
    this.http.get<any>('http://localhost:5148/api/Meetings/GetAll').subscribe(
      (data) => {
        this.meetings = data?.data;
        console.log(data);
      },
      (error) => {
        console.error('Toplantılar alınırken hata oluştu: ', error);
      }
    );
  }

  cancelMeeting(meetingId: string): void {
    this.http.post(`http://localhost:5148/api/Meetings/Delete/${meetingId}`,null).subscribe(
      () => {
        this.meetings = this.meetings.filter(meeting => meeting.id !== meetingId);
      },
      (error) => {
        console.error('Toplantı silinirken hata oluştu: ', error);
      }
    );
  }
}
