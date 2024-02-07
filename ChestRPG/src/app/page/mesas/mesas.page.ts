 import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CriarPage } from '../modal/criar/criar.page';
import { JuntarPage } from '../modal/juntar/juntar.page';
import { TablesService } from 'src/app/service/tables.service'; // Certifique-se de ajustar o caminho correto
import { LoginService } from 'src/app/service/login.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit {
  mesas: any[] = [];  // Aqui você deve carregar a lista de mesas do seu serviço

  constructor(private modalController: ModalController, private tablesService: TablesService, private router: Router, private loginService: LoginService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.carregarMesas();
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

  carregarMesas() {
    this.tablesService.getTables().subscribe((mesas) => {
      this.mesas = mesas;
    });
  }

  entrarNaMesa(mesa: any) {
    console.log('Mesa selecionada:', mesa);
    
    // Verificar se idTable é válido
    if (mesa && mesa.idTable) {
      console.log('ID da mesa válido:', mesa.idTable);
      // Navegar para dentro-mesa com os dados da mesa
      this.router.navigate(['/dentro-mesa', mesa.idTable]);
    } else {
      console.error('ID da mesa inválido:', mesa);
    }
  }
  

  sairDaMesa(mesa: any) {
    // Lógica para sair da mesa
  }

  excluirMesa(mesa: any) {
    // Lógica para excluir a mesa
  }

  editarMesa(mesa: any) {
    // Lógica para editar a mesa
  }

}
