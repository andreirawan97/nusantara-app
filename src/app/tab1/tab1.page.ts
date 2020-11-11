import { Component } from "@angular/core";
import { MaungImage } from "src/assets";
import { ActivatedRoute } from '@angular/router';
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
  public totalLevel: number = 10; // Total level dari kategori terakhir
  public arrayOfKategori = [];

  constructor(public storage : Storage, public registerSrv : RegisterService) {
      //get user id dari halaman register or login
      storage.get('userId').then((parameter) => {
      this.getCategory(parameter);
      this.showScore(parameter);
    });
  }

  ngOnInit() {
  
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
    var len = dataKategori.length;
    var color = "";
    for (var i =0; i<len; i++){
      if(dataKategori[i].progress != 100){
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
    });
  }

}
