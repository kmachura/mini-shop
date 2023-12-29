import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiBannerComponent } from './components/ui-banner/ui-banner.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SliderComponent, UiBannerComponent],
  exports: [SliderComponent, UiBannerComponent],
})
export class UiModule {}
