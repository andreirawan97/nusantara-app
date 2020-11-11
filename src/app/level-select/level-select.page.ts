import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CorrectIcon, FalseIcon, PreviousIcon } from "src/assets";
import { Storage } from '@ionic/storage';
import { RegisterService } from '../service/register.service';

@Component({
  selector: "app-level-select",
  templateUrl: "./level-select.page.html",
  styleUrls: ["./level-select.page.scss"],
})
export class LevelSelectPage implements OnInit {
  public correctSource = CorrectIcon;
  public falseSource = FalseIcon;
  public previousSource = PreviousIcon;
  public userId : string;
  public kategoriId: string;
  public nama_kategori : string;

 
  public mockData = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private storage : Storage,
    private registerSrv : RegisterService) {
  }

  ngOnInit() {
    this.storage.get('userId').then((val)=>{
      this.userId = val;
    })
    this.kategoriId = this.activatedRoute.snapshot.paramMap.get("kategoriId");
    this.getCategory(this.kategoriId);
  }

  getCategory(kategoriId : any) { 
    this.storage.get('userId').then((val)=>{
      this.userId = val;
      this.getName(this.userId);
      this.registerSrv.getSoalPerkategori(val,kategoriId).subscribe(
        res=>{
          this.showSoalPerkategori(res);
        }
      );
    }) 
  }

  getName(userId){
    this.registerSrv.getKategori(userId).subscribe(
      res=> {
        for(let i=0; i<res.length;i++){
          if(this.kategoriId === res[i].kategori_id){
            this.nama_kategori = res[i].nama_kategori;
          }
        }
    });
  }

  showSoalPerkategori(data : any){
    var len = data.soal.length;
    for(let i=0; i<len ; i++){
      this.mockData.push({
        judul: data.soal[i].judul,
        id_soal: data.soal[i].id_soal,
        is_done: data.soal[i].is_done,
        is_right: false,
        ordering: data.soal[i].ordering,
      });
    } 
  }

  goBack() {
    this.router.navigateByUrl("tabs/tab1");
  }
}
