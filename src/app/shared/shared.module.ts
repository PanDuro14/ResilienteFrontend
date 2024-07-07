import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ColorbarComponent } from '../components/colorbar/colorbar.component';
import { WhatsappComponent } from '../components/whatsapp/whatsapp.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ColorbarComponent, WhatsappComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, ColorbarComponent, WhatsappComponent, RouterModule]
})

export class SharedModule { }