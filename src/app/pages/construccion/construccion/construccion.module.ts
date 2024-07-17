import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConstruccionPageRoutingModule } from './construccion-routing.module';

import { ConstruccionPage } from './construccion.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstruccionPageRoutingModule,
    SharedModule
],
  declarations: [ConstruccionPage]
})
export class ConstruccionPageModule {}
