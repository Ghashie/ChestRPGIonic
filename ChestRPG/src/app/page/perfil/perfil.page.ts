import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any = {};
  editMode: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    // Chame a função para obter os dados do usuário no início
    this.getUserData();
  }

  getUserData() {
    // Use o serviço de login para obter os dados do usuário
    const userData = this.loginService.getUserData();
    console.log('Dados do usuário obtidos:', userData);
    if (userData) {
      this.userData = userData.user;
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
  console.log('Salvando alterações:', this.userData);

  // Obtenha o token do serviço
  const token = this.loginService.getUserData()?.token;

  if (!token) {
    console.error('Token ausente');
    return;
  }

  // Adicione o token aos cabeçalhos da requisição
  const headers = { Authorization: token };

  // Chame o serviço para atualizar o usuário
  this.loginService.updateUser(this.userData.idUser, this.userData, headers).subscribe(
    (response) => {
      console.log('Alterações salvas com sucesso:', response);
      // Se necessário, atualize os dados do usuário após a atualização no servidor
      // Exemplo: this.getUserData();
      this.toggleEditMode(); // Volte para o modo de visualização após salvar
    },
    (error) => {
      console.error('Erro ao salvar alterações:', error);
    }
  );
}

confirmDeleteAccount() {
  const shouldDelete = window.confirm('Você realmente deseja excluir a conta? Esta ação é irreversível.');

  if (shouldDelete) {
    console.log('Excluindo conta...');

    // Chame o serviço para excluir o usuário
    this.loginService.deleteUser(this.userData.idUser).subscribe(
      (response) => {
        console.log('Conta excluída com sucesso:', response);
        // Implemente a lógica de redirecionamento ou outra ação necessária após a exclusão
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro ao excluir conta:', error);
      }
    );
  }
}
}
