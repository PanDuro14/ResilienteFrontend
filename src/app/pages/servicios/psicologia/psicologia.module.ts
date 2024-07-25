import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsicologiaPageRoutingModule } from './psicologia-routing.module';

import { PsicologiaPage } from './psicologia.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsicologiaPageRoutingModule,
    SharedModule
],
  declarations: [PsicologiaPage]
})
export class PsicologiaPageModule {}
