import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public localhost = "http://localhost:5001/nusantara-8e7ba/us-central1/api/";
  public production = "https://us-central1-nusantara-8e7ba.cloudfunctions.net/api/";

  constructor(
    private http : HttpClient
  ) { }

  registerUser(newUser : any){
    const user = {
      image : newUser.image,
      nama : newUser.nama,
      username : newUser.username,
      password : newUser.password,
    };
  
    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>(this.production+'register',user,options);
  }

  ceklogin(user : any){
    const LoginUser = {
      username : user.username,
      password : user.password,
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>(this.production+'login',LoginUser,options);
  }

  getKategori(userId : any){
    const data = {
      uid : userId,
    };
    console.log("GetKategori");
    console.log(data);
    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>(this.production+'getKategori',data,options); 
  }

  getTotalScore(userId : any){
    const data = {
      uid : userId,
    };
    console.log("GetTotalScore");
    console.log(data);
    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>(this.production+'getTotalScore',data,options); 
  }

  getSoalPerkategori(userId : any, kategoriId : any){
    const data = {
      uid : userId,
      id_kategori : kategoriId
    };
    console.log("GetSoalPerkategori");
    console.log(data);
    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>(this.production+'getSoalPerkategori',data,options); 
  }

  getSoal(soalId : any){
    const data = {
      id_soal : soalId
    };
    console.log("getSoal");
    console.log(data);
    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>(this.production+'getSoal',data,options); 
  }

  jawabSoal(soalId:any , userId :any, jawab : any){
    const data = {
      id_soal : soalId,
      uid : userId,
      jawab : jawab
    };
    console.log("jawabSoal");
    console.log(data);
    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>(this.production+'jawabSoal',data,options); 
  }

}

