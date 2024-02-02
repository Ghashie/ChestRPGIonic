import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menuController: MenuController, private router: Router) {}

  closeMenuAndNavigate(route: string): void {
    this.menuController.close('main-menu');  // Fechar o menu
    this.router.navigate([route]);  // Navegar para a rota desejada
  }

  logout(): void {
    // Implemente a lógica de logout aqui
    // Por exemplo, limpar dados de sessão, redirecionar para a página de login, etc.
    // Exemplo de redirecionamento para a página de login
    this.router.navigate(['/login']);

    // Feche o menu após o logout
    this.menuController.close('main-menu');
  }

  private updateActiveState(): void {
    const activeRoute = this.router.url;
    const menuItems = document.querySelectorAll('.menu-items ion-item');

    menuItems.forEach((item: any) => {
      const itemRoute = item.getAttribute('routerLink');
      if (itemRoute && activeRoute.includes(itemRoute)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}
