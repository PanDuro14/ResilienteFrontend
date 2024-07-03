import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ColorbarComponent } from '../components/colorbar/colorbar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    
  ],
  declarations: [HomePage, NavbarComponent, FooterComponent, ColorbarComponent]
})
export class HomePageModule {}
