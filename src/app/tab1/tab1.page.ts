import { Component } from "@angular/core";
import { MaungImage } from "src/assets";
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NgForOf } from '@angular/common';
import { RegisterService } from '../service/register.service';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  public reward : number = 0;
  public userId : string = " ";
  public maungSource = MaungImage;
  public currentCategory: string = "BANGUNAN IKONIK";
  public currentProgress: number = 2; // Progress user
  public totalLevel: number = 100; // Total level dari kategori terakhir
  public arrayOfKategori = [];

  constructor(public storage : Storage, public registerSrv : RegisterService, public router : Router) {
  }

  ngOnInit() {
  
  }

  ionViewWillEnter(){
    this.storage.get('userId').then((parameter) => {
      console.log("tes :", parameter);
      if(!parameter){
        this.router.navigateByUrl('/register');
      }
      this.getCategory(parameter);
      this.showScore(parameter);
    });
  }

  getCategory(userId){
    this.registerSrv.getKategori(userId).subscribe(
      res=> {
        //console.log(res);
        this.showCategory(res);
        this.storage.set('kategoriId',res.kategori_id);
    });
  }

  showCategory(dataKategori : any){
    this.arrayOfKategori =[];
    var len = dataKategori.length;
    var color = "";
    for (var i =0; i<len; i++){
      if(dataKategori[i].progress != 1){
        color = "#FBDCDB";
      }
      else{
        color = "#D1F4E6";
      }
      this.arrayOfKategori.push({
        id : dataKategori[i].kategori_id,
        nama : dataKategori[i].nama_kategori,
        jumlahPertanyaan : dataKategori[i].jumlah_soal,
        warna : color,
      });
    }
  }  

  showScore(userId){
    this.registerSrv.getTotalScore(userId).subscribe(
      res=> {
        //console.log(res);
        this.reward = res.total_reward;
        this.storage.set('reward', this.reward);
        // if (this.reward === 0){
        //   this.currentCategory = "Yuk mulai bermain dengan memilih kategori di bawah"
        // }
    });
  }

}
