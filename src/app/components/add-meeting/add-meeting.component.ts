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
  fileToUpload: File | null = null;

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

    const formData = new FormData();
    formData.append('meetingName', this.meetingForm.value.name);
    formData.append('startDate', this.meetingForm.value.startDate);
    formData.append('endDate', this.meetingForm.value.endDate);
    formData.append('description', this.meetingForm.value.description);
    if (this.meetingForm.value.document) {
      formData.append('document', this.meetingForm.value.document);
    }


    const user = this.authService.getUser();
    if (user) {
      // this.meetingForm.patchValue({ user });
      formData.append('user', JSON.stringify(user));

    }

    this.meetingService.createMeeting(formData).subscribe(() => {
      this.resetForm();
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.meetingForm.patchValue({
        document: file
      });
    }
  }

  resetForm() {
    this.meetingForm.reset();
  }
}
