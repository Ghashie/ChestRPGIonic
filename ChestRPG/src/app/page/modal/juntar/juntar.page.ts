import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MembersService } from 'src/app/service/members.service';  // Certifique-se de ajustar o caminho correto
import { TablesService } from 'src/app/service/tables.service';  // Certifique-se de ajustar o caminho correto
@Component({
  selector: 'app-juntar',
  templateUrl: './juntar.page.html',
  styleUrls: ['./juntar.page.scss'],
})

export class JuntarPage implements OnInit {
  codeTable: string = '';

  constructor(private modalController: ModalController, private tablesService: TablesService,private membersService: MembersService) { }

  ngOnInit() {

  }

  joinMesa() {
    // Verifica se o código da mesa foi fornecido
    if (!this.codeTable) {
      // Adicione lógica de tratamento aqui, como exibir uma mensagem para o usuário
      return;
    }
    // Chama o serviço para juntar-se à mesa usando o código
    this.membersService.joinTableByCode(this.codeTable).subscribe(response => {
      // Lógica após juntar-se à mesa (pode ser redirecionamento, atualização da lista de mesas, etc.)
      this.modalController.dismiss();  // Fechar o modal após juntar-se à mesa
    });
  }

}
