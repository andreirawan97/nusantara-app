import { Component } from '@angular/core';
import { tabsHome } from '../../assets';
import { tabsLeaderboard } from '../../assets';
import { MaungImage } from "../../assets";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public tabsHome = tabsHome;
  public tabsLeaderboard = tabsLeaderboard;
  public tabsProfile = MaungImage;
  
  constructor(public storage : Storage) {}


}
