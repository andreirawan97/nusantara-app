import { Component, OnInit } from '@angular/core';
import { MaungImage } from "src/assets";

@Component({
  selector: 'app-fotoprofile',
  templateUrl: './fotoprofile.page.html',
  styleUrls: ['./fotoprofile.page.scss'],
})
export class FotoprofilePage {
  public maungSource = MaungImage;

  constructor() { }

  ngOnInit() {
  }

}
