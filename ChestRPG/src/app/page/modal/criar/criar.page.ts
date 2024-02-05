import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TablesService } from 'src/app/service/tables.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.page.html',
  styleUrls: ['./criar.page.scss'],
})
export class CriarPage implements OnInit {
  nameTable: string = '';
  descriptionTable: string = '';
  passwordTable: string = '';

  constructor(private modalController: ModalController, private tablesService: TablesService, private toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  ngOnInit() { }

  criarMesa() {
    const tableData = {
      nameTable: this.nameTable,
      descriptionTable: this.descriptionTable,
      passwordTable: this.passwordTable,
    };

    if (!tableData.nameTable || !tableData.descriptionTable || !tableData.passwordTable) {
      this.presentToast('Por favor, preencha todos os campos');
      return;
    }

    this.tablesService.createTable(tableData).subscribe(
      (response) => {
        this.presentToast('Mesa criada com sucesso');
        this.modalController.dismiss();
      },
      (error) => {
        console.error(error);
        this.presentToast('Erro ao criar a mesa. Tente novamente.');
      }
    );
  }
}
