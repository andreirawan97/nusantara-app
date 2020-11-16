import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(
    private http : HttpClient
  ) { }

  getLeaderboard(uid: any){
    const data = {
      id_saya : uid 
    };
  
    const headers = new HttpHeaders();
    headers.append('Content-Type,', 'application/x-www-form-urlencoded');
    const options = {headers: headers};

    return this.http.post<any>('https://us-central1-nusantara-8e7ba.cloudfunctions.net/api/getLeaderboard',data,options);
  }
}
