import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultoriaPage } from './consultoria.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultoriaPageRoutingModule {}
