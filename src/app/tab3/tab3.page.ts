import { Component } from '@angular/core';
import { MaungImage } from "../../assets";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public maungSource = MaungImage;
  constructor(private route : Router) {}

  toLogout(){
    this.route.navigateByUrl('/register');
  }

}
