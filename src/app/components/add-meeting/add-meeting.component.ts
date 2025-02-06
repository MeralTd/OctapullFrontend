import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../../services/meeting.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-meeting',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-meeting.component.html',
})
export class AddMeetingComponent {
  meetingForm: FormGroup;

  constructor(private meetingService: MeetingService, private fb: FormBuilder) {
    this.meetingForm = this.fb.group({
      meetingName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.meetingForm.valid) {
      console.log(this.meetingForm.value);
    }

    // const formData = new FormData();
    // formData.append('meetingName', this.meetingForm.value.name);
    // formData.append('startDate', this.meetingForm.value.startDate);
    // formData.append('endDate', this.meetingForm.value.endDate);
    // formData.append('description', this.meetingForm.value.description);
    // if (this.meetingForm.value.document) {
    //   formData.append('document', this.meetingForm.value.document);
    // }

    this.meetingService.createMeeting(this.meetingForm.value).subscribe(() => {
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
