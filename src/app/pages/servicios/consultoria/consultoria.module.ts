import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultoriaPageRoutingModule } from './consultoria-routing.module';

import { ConsultoriaPage } from './consultoria.page';
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultoriaPageRoutingModule,
    SharedModule
  ],
  declarations: [ConsultoriaPage]
})
export class ConsultoriaPageModule {}
