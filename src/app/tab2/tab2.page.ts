import { Component } from '@angular/core';
import { MaungTrophy} from 'src/assets';
import { LeaderboardService } from '../service/leaderboard.service';
import { Storage } from '@ionic/storage';
import { RegisterService } from '../service/register.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public reward : number = 0;
  public maungTrophyImage = MaungTrophy;
  public showLeaderboard = false;
  listLeaderboard: any;

  constructor(
    private leaderboardService : LeaderboardService,
    public storage : Storage,
    public registerSrv : RegisterService
  ) {}
  
  ngOnInit() {
    this.storage.get('reward').then((getReward) => {
      // console.log(getReward);
      this.reward = getReward;
      if(this.reward != 0) this.showLeaderboard = true;
      if(this.showLeaderboard) {
        this.storage.get('userId').then((user_id) => {
          // console.log(user_id);
          this.leaderboardService.getLeaderboard(user_id).subscribe(
            res=> {
              this.listLeaderboard = res;
            }
          );
        })
      } 
    });
  }
}
