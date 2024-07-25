import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsicologiaPage } from './psicologia.page';

const routes: Routes = [
  {
    path: '',
    component: PsicologiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsicologiaPageRoutingModule {}
