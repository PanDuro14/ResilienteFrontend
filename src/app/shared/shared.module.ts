import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ColorbarComponent } from '../components/colorbar/colorbar.component';
import { WhatsappComponent } from '../components/whatsapp/whatsapp.component';
import { CitaComponent } from '../components/cita/cita.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ColorbarComponent, WhatsappComponent, CitaComponent],
  imports: [CommonModule, IonicModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [NavbarComponent, FooterComponent, ColorbarComponent, WhatsappComponent, CitaComponent ,RouterModule]
})

export class SharedModule { }