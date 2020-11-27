import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { PadangImage } from "src/assets";
import { runInThisContext } from 'vm';
import { RegisterService } from '../service/register.service';

@Component({
  selector: "app-level",
  templateUrl: "./level.page.html",
  styleUrls: ["./level.page.scss"],
})
export class LevelPage implements OnInit {
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
    private registerSrv : RegisterService
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
    if(!this.next){
      //console.log("Ini adalah soal terakhir");
    }
    else{
      this.soalId = this.next;
      this.showSoal(this.next);
    }
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
        if(res.is_right){
          this.isTrue = false;
          this.isFalse = true;
        }
        else{
          this.isFalse = false;
          this.isTrue = true;
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


  
}
