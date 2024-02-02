import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuntarPage } from './juntar.page';

const routes: Routes = [
  {
    path: '',
    component: JuntarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuntarPageRoutingModule {}
