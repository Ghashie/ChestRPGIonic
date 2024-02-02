import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CriarPage } from '../modal/criar/criar.page';
import { JuntarPage } from '../modal/juntar/juntar.page';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {

  }

  async openCriarModal() {
    const modal = await this.modalController.create({
      component: CriarPage,  // Certifique-se de ajustar o nome do componente/modal corretamente
    });
    return await modal.present();
  }

  async openJuntarModal() {
    const modal = await this.modalController.create({
      component: JuntarPage,  // Certifique-se de ajustar o nome do componente/modal corretamente
    });
    return await modal.present();
  }

}
