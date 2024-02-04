import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentroMesaPage } from './dentro-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: DentroMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentroMesaPageRoutingModule {}
