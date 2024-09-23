import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DedicatoriaPageRoutingModule } from './dedicatoria-routing.module';

import { DedicatoriaPage } from './dedicatoria.page';
import { SharedModule } from "../../../shared/shared.module";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DedicatoriaPageRoutingModule,
    SharedModule,
],
  declarations: [DedicatoriaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DedicatoriaPageModule {}
