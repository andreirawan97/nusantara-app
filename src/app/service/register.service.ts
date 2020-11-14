import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http : HttpClient
  ) { }

  registerUser(newUser : any){
    //console.log(newUser);
    const user = {
      image : newUser.image,
      nama : newUser.nama,
      username : newUser.username,
      password : newUser.password,
    };
  
    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>('https://us-central1-nusantara-8e7ba.cloudfunctions.net/api/register',user,options);
  }

  ceklogin(user : any){
    const LoginUser = {
      username : user.username,
      password : user.password,
    };

    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};
    return this.http.post<any>('https://us-central1-nusantara-8e7ba.cloudfunctions.net/api/login',LoginUser,options);
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
    return this.http.post<any>('https://us-central1-nusantara-8e7ba.cloudfunctions.net/api/getKategori',data,options); 
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
    return this.http.post<any>('https://us-central1-nusantara-8e7ba.cloudfunctions.net/api/getTotalScore',data,options); 
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
    return this.http.post<any>('https://us-central1-nusantara-8e7ba.cloudfunctions.net/api/getSoalPerkategori',data,options); 
  }
}
