import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { CorrectIcon, FalseIcon, PreviousIcon } from "src/assets";
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RegisterService } from '../service/register.service';

@Component({
  selector: "app-level",
  templateUrl: "./level.page.html",
  styleUrls: ["./level.page.scss"],
})

export class LevelPage implements OnInit {
  public correctSource = CorrectIcon;
  public falseSource = FalseIcon;
  public prevHidden;
  public nextHidden;
  public isTrue = true;
  public isFalse = true;
  public userId;
  public reward;
  public kategoriId: string ="";
  public soalId : string = "";
  public soalImage = "";
  public soal = "";
  public pilihan = [];
  public prev = "";
  public next = "";


  constructor( 
    private router : Router,
    private storage : Storage,
    private registerSrv : RegisterService,
    public alertController: AlertController
  ) {
    storage.get('userId').then((parameter) => {
      this.showScore(parameter);
    });
  }

  ngOnInit() {
    this.storage.get('id_kategori').then((val)=>{
      //console.log("value :",val);
      this.kategoriId = val;
    })
    this.storage.get('userId').then((val)=>{
      //console.log("userId value :",val);
      this.userId = val;
    })
    this.storage.get('id_soal').then((val)=>{
      this.showSoal(val);
      this.soalId = val;
      //console.log("test value :",this.soalId);
    })
  }
  

  toCategory(){
    this.router.navigateByUrl('/level-select/'+this.kategoriId);
  }

  showSoal(id_soal : any){
    this.isTrue = true;
    this.isFalse = true;
    this.soalId = id_soal;
    this.registerSrv.getSoal(id_soal).subscribe(
      res=> {
        if(!res.prev){
          this.prevHidden = true;
        }
        else{
          this.prevHidden = false;
        }

        if(!res.next){
          this.nextHidden = true;
        }
        else{
          this.nextHidden = false;
        }
        this.soalImage = res.image_soal;
        this.soal = res.soal;
        this.pilihan = res.pilihan;
        this.prev = res.prev;
        this.next = res.next;
    });
  }

  lewati(){
      this.soalId = this.next;
      this.storage.set('id_soal', this.soalId);
      this.router.navigate(['/level/' + this.soalId]);
  }

  kembali(){
    if(!this.prev){
      //console.log("Ini soal pertama");
    }
    else{
      this.soalId = this.prev;
      this.showSoal(this.prev);
    }
  }

  jawabSoal(jawaban : any){
    this.registerSrv.jawabSoal(this.soalId,this.userId,jawaban).subscribe(
      res=>{
        console.log(res);
          if(res.is_right){
            if(this.next)
            this.presentAlertRightAnswer(res.info, res.reward);
            else
            this.presentAlertLastQuestion(res.info, res.reward);
          }
          else {
            this.presentAlertWrongAnswer(res.info)
          }
          
      }
    );
  }

  showScore(userId){
    this.registerSrv.getTotalScore(userId).subscribe(
      res=> {
        //console.log(res);
        this.reward = res.total_reward;
        this.storage.set('reward', this.reward);
    });
  }

  async presentAlertRightAnswer(info :any, reward : any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: info,
      subHeader: `Kamu memperoleh score sebesar ` + reward,
      message: `<img class="alertImage" src="${this.correctSource}" >`,
      buttons: [
        {
          text: 'Tetap Disini',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Lanjut',
          handler: () => {
            this.lewati();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertWrongAnswer(info :any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: info,
      message: `<img class="alertImage" src="${this.falseSource}" >`,
      buttons: [
        {
          text: 'Coba Lagi',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertLastQuestion(info :any, reward : any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header : info,
      subHeader: `Kamu memperoleh score sebesar ` + reward,
      message: `<img class="alertImage" src="${this.correctSource}" >`,
      buttons: [
        {
          text: 'Tetap Disini',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }


  
}
