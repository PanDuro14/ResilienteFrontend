import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConveniosPageRoutingModule } from './convenios-routing.module';

import { ConveniosPage } from './convenios.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ConveniosPageRoutingModule,
    SharedModule,
],
  declarations: [ConveniosPage]
})
export class ConveniosPageModule {}
