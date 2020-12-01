import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotoprofilePage } from './fotoprofile.page';

const routes: Routes = [
  {
    path: '',
    component: FotoprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotoprofilePageRoutingModule {}
