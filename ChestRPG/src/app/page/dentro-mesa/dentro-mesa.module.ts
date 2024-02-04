import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentroMesaPageRoutingModule } from './dentro-mesa-routing.module';

import { DentroMesaPage } from './dentro-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentroMesaPageRoutingModule
  ],
  declarations: [DentroMesaPage]
})
export class DentroMesaPageModule {}
