import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { EditProfileService } from '../service/edit-profile.service';
import { Storage } from '@ionic/storage';
import { RegisterService } from '../service/register.service';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  username: string;
  fullname : string;
  userId: string;
  // @Input() usernameText: string;
  @Input() passwordText: string;
  @Input() nameText: string;
  errorText: string = "";
  
  constructor(

    public storage : Storage, 
    public registerSrv: RegisterService, 
    private route : Router) 
    {}

  ngOnInit() {}

  ionViewWillEnter(){
    // this.nameText = "lol"; 
    this.storage.get('nama').then((parameter) => {
      this.nameText = parameter;
      // console.log(parameter);
    })
    this.storage.get('username').then((parameter) => {
      this.username = parameter;
      // console.log(parameter);
    })
    this.passwordText = "";
  }

  simpanProfile(){
    if (!this.nameText) {
      this.errorText = "Mohon isi semua field";
      return;
    }
    else{
      const user ={
        image    : "test",
        nama     : this.nameText,
        username : this.username,
        newPassword : Md5.init(this.passwordText),
      };
      console.log(user);
      this.registerSrv.editProfile(user).subscribe(res=>{
        console.log(res);
      })
    }
    
  }
  
  toLogout(){
    this.route.navigateByUrl('/register');
  }
}

