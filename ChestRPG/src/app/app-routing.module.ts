import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./page/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'politica',
    loadChildren: () => import('./page/politica/politica.module').then( m => m.PoliticaPageModule)
  },
  {
    path: 'atualizacoes',
    loadChildren: () => import('./page/atualizacoes/atualizacoes.module').then( m => m.AtualizacoesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./page/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'criar',
    loadChildren: () => import('./page/modal/criar/criar.module').then( m => m.CriarPageModule)
  },
  {
    path: 'juntar',
    loadChildren: () => import('./page/modal/juntar/juntar.module').then( m => m.JuntarPageModule)
  },  {
    path: 'mesas',
    loadChildren: () => import('./page/mesas/mesas.module').then( m => m.MesasPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
