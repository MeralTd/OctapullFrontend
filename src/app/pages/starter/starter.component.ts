import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MeetingListComponent } from '../../components/meeting-list/meeting-list.component';

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    MeetingListComponent,
    ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }
