import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { GeolocationPage } from '../geolocation/geolocation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = SettingsPage;
  tab4Root = GeolocationPage;

  constructor() {

  }
}
