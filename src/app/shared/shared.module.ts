import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ColorbarComponent } from '../components/colorbar/colorbar.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ColorbarComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, ColorbarComponent, RouterModule]
})

export class SharedModule { }