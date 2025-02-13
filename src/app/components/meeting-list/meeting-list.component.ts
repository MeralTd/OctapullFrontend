import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { MeetingService } from '../../services/meeting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Meeting {
  id: number;
  meetingName: string;
  startDate: string;
  endDate: string;
  description: string;
}

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class MeetingListComponent implements OnInit {
  meetings: Meeting[] = [];
  displayedColumns: string[] = ['meetingName', 'startDate', 'endDate', 'description', 'actions']; // Burada gösterilecek kolonları belirliyoruz

  meetingForm!: FormGroup;
  editMode: boolean = false;
  editMeetingId: number | null = null;

  constructor(private fb: FormBuilder, private meetingService: MeetingService) {}

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id: [],
      meetingName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getMeetings();
  }


  getMeetings(): void {
    this.meetingService.getMeetings().subscribe(
      (data) => {
        console.log(data);
        this.meetings = data?.data || [];
      },
      (error) => {
        console.error('Toplantılar alınırken hata oluştu: ', error);
      }
    );
  }

  cancelMeeting(meetingId: number): void {
    this.meetingService.cancelMeeting(meetingId).subscribe(
      () => {
        this.meetings = this.meetings.filter(meeting => meeting.id !== meetingId);
      },
      (error) => {
        console.error('Toplantı silinirken hata oluştu: ', error);
      }
    );
  }

  deleteMeeting(meetingId: number): void {
    this.meetingService.deleteMeeting(meetingId).subscribe(
      () => {
        this.meetings = this.meetings.filter(meeting => meeting.id !== meetingId);
      },
      (error) => {
        console.error('Toplantı silinirken hata oluştu: ', error);
      }
    );
  }

  onEdit(meetingId: number): void {
    this.editMode = true;
    this.editMeetingId = meetingId;
    this.meetingService.getMeetingById(meetingId).subscribe(meeting => {
      this.meetingForm.patchValue(meeting.data);
    });
  }


  onSubmit(): void {
    console.log(this.meetingForm)

    if (this.meetingForm.valid) {
      const meetingData = this.meetingForm.value;

      if (this.editMeetingId) {
        this.meetingService.updateMeeting(meetingData).subscribe(() => {
          this.getMeetings();
          this.resetForm();
        });
      }
    }
  }

  resetForm(): void {
    this.meetingForm.reset();
    this.editMode = false;
    this.editMeetingId = null;
  }

}
