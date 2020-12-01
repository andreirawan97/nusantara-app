import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotoprofilePageRoutingModule } from './fotoprofile-routing.module';

import { FotoprofilePage } from './fotoprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotoprofilePageRoutingModule
  ],
  declarations: [FotoprofilePage]
})
export class FotoprofilePageModule {}
