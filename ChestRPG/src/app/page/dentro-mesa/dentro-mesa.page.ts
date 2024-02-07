import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/service/tables.service';

@Component({
  selector: 'app-dentro-mesa',
  templateUrl: './dentro-mesa.page.html',
  styleUrls: ['./dentro-mesa.page.scss'],
})
export class DentroMesaPage implements OnInit {
  mesaId: string = '';
  mesa: any;
  chatMessages: string[] = [];
  newMessage: string = '';

  constructor(private route: ActivatedRoute, private tablesService: TablesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mesaId = params['id'];
      console.log('ID da mesa recebido:', this.mesaId);

      // Carregar detalhes da mesa
      this.tablesService.getDetalhesMesa(this.mesaId).subscribe(
        mesa => {
          this.mesa = mesa;
        },
        error => {
          console.error('Erro ao carregar detalhes da mesa:', error);
        }
      );
    });
  }

  enviarMensagem() {
    if (this.newMessage.trim() !== '') {
      this.chatMessages.push(this.newMessage);
      this.newMessage = '';
    }
  }
}
