import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../../services/meeting.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-meeting',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-meeting.component.html',
})
export class AddMeetingComponent {
  meetingForm: FormGroup;

  constructor(private authService: AuthService, private meetingService: MeetingService, private fb: FormBuilder) {
    this.meetingForm = this.fb.group({
      meetingName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      user: [null],
    });
  }

  onSubmit() {
    if (this.meetingForm.valid) {
      console.log(this.meetingForm.value);
    }

    const user = this.authService.getUser();
    if (user) {
      this.meetingForm.patchValue({ user });
    }

   

    this.meetingService.createMeeting(this.meetingForm.value).subscribe(() => {
      this.resetForm();
    });
  }

  resetForm() {
    this.meetingForm.reset();
  }
}
