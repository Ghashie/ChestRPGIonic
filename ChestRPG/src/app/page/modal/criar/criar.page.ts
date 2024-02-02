import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TablesService } from 'src/app/service/tables.service'; // Certifique-se de ajustar o caminho correto
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.page.html',
  styleUrls: ['./criar.page.scss'],
})
export class CriarPage implements OnInit {
  nameTable: string = '';
  descriptionTable: string = '';
  passwordTable: string = '';

  constructor(private modalController: ModalController, private http: HttpClient, private toastController: ToastController,private tablesService: TablesService) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  ngOnInit() {}

  criarMesa() {
    const tableData = {
      nameTable: this.nameTable,
      descriptionTable: this.descriptionTable,
      passwordTable: this.passwordTable,
    };

    // Verifica se todas as informações foram fornecidas
    if (!tableData.nameTable || !tableData.descriptionTable || !tableData.passwordTable) {
      this.presentToast('Por favor, preencha todos os campos');
      return;
    } else {
      this.tablesService.createTable(tableData).subscribe((response) => {
        // Lógica após a criação da mesa (pode ser redirecionamento, atualização da lista de mesas, etc.)
        this.modalController.dismiss(); // Fechar o modal após a criação da mesa
      });
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }


}