import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MaungTrophy} from 'src/assets';
import { LeaderboardService } from '../service/leaderboard.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public maungTrophyImage = MaungTrophy;
  public showLeaderboard = true;
  listLeaderboard: any;
  public reward : number = 0;

  constructor(
    private leaderboardService : LeaderboardService,
    private storage : Storage
  ) {}
  
  ngOnInit() {
    this.leaderboardService.getKategori().subscribe(
      res=> {
        this.listLeaderboard = res;
      }
    );
    this.storage.get('reward').then((parameter) => {
      this.reward = parameter;
    }); 
  }

  
}
