import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-banner',
  templateUrl: './ui-banner.component.html',
})
export class UiBannerComponent {
  @Input() img: unknown;
  @Input() header = '';
  @Input() subheader = '';
  @Input() buttonText = '';
}
