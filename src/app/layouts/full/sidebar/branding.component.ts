import { Component } from '@angular/core';
import { CoreService } from '../../../services/core.service';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <a href="/" class="logodark" style="text-decoration:none">
      <strong> OCTAPULL </strong>
    </a>
  `,
})
export class BrandingComponent {
  options: any;

  constructor(private settings: CoreService) {}

  ngOnInit() {
    // Now it's safe to access this.settings
    this.options = this.settings.getOptions();
  }
}
