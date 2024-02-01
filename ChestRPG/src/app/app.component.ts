import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private menuController: MenuController, private router: Router) {
    // Monitorar alterações de rota para atualizar a classe "active"
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState();
    });
  }

  closeMenuAndNavigate(route: string): void {
    this.menuController.close('main-menu');  // Fechar o menu
    this.router.navigate([route]);  // Navegar para a rota desejada
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
