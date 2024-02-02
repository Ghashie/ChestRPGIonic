import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuntarPageRoutingModule } from './juntar-routing.module';

import { JuntarPage } from './juntar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuntarPageRoutingModule
  ],
  declarations: [JuntarPage]
})
export class JuntarPageModule {}
