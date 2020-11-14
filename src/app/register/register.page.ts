import { Component, OnInit, Input } from '@angular/core';
import { MaungImage } from "../../assets";
import { Router } from '@angular/router';
import { Md5 } from "md5-typescript";
import { RegisterService } from '../service/register.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @Input() namaText : string;
  @Input() usernameText: string;
  @Input() passwordText: string;
  image : string= "base64";
  errorText: string = "";

  public maungSource = MaungImage;

  constructor(
    private route : Router,
    private registerSrv : RegisterService,
    private storage : Storage,
    private toast : ToastController) { }

  ngOnInit() {

  }

  onClickRegister() {
    if (!this.usernameText || !this.passwordText || !this.namaText) {
      this.errorText = "Mohon isi semua field";
      return;
    }
    else{
      const user = {
        image : "base64",
        nama : this.namaText,
        username : this.usernameText,
        password : Md5.init(this.passwordText),
      };
      this.registerSrv.registerUser(user).subscribe(
        res=> {
          //console.log(res);
          this.registerHandler(res.success, res.status);
          this.storage.set('userId', res.uid);
        }
      );
    }
  }

  toLogin(){
    this.route.navigateByUrl('/login');
  }

  registerHandler(successMessage : any, registerStatus : any){
    if(!successMessage){
      this.presentToast(registerStatus);
    }
    else {
      this.presentToast(registerStatus);
      this.route.navigateByUrl('/tabs');
    }
  }

  async presentToast(text : any) {
    const toast = await this.toast.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
