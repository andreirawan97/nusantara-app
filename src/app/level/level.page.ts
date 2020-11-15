import { Component, OnInit } from "@angular/core";

import { PadangImage } from "src/assets";

@Component({
  selector: "app-level",
  templateUrl: "./level.page.html",
  styleUrls: ["./level.page.scss"],
})
export class LevelPage implements OnInit {
  public padangImage = PadangImage;
  public soal = "Gedung apakah itu?";
  public pilihan = [
    "Gedung Sate",
    "Gedung Roti",
    "Gedung Bakwan",
    "Gedung Padang",
  ];

  constructor() {}

  ngOnInit() {}
}
