import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  username: string;
  
  constructor(
    public storage : Storage, 
    public registerSrv: RegisterService, 
    private route : Router) 
    {
      storage.get('user').then((parameter) => {
        this.showNama(parameter);
      });
  }

  ngOnInit() {}

  showNama(user : any){
    const data = {
      username : this.username,
    };
    console.log("cek");
    console.log(data);
    this.registerSrv.ceklogin(user).subscribe(
      res=> {
        console.log("cek1");
        console.log(res);
        this.storage.set('username', this.username);
      }
    )
  }
  
  toLogout(){
    this.route.navigateByUrl('/register');
  }
}

