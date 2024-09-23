import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DedicatoriaPage } from './dedicatoria.page';

const routes: Routes = [
  {
    path: '',
    component: DedicatoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DedicatoriaPageRoutingModule {}
