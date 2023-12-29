import { Component } from '@angular/core';

@Component({
  selector: 'mini-shop-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  imgBannerPath = '../../assets/img/Wine-illustration.png';
  bannerHeader = 'Wino na każdą okazję';
  bannerSubheader = 'Odkryj bogactwo smaków i aromatów w naszym ekskluzywnym asortymencie win. Znajdź idealne wino, które uwydatowi smak Twojego wyjątkowego momentu. Zapraszamy do naszego sklepu z winami, gdzie pasja spotyka się z doskonałością winiarskiego rzemiosła. Znajdź swoje ulubione wino już dziś!';
  bannerButtonText = 'DO SKLEPU'

}
