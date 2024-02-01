import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    username: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService
      .loginUser(this.loginData.username, this.loginData.password)
      .subscribe(
        (response) => {
          console.log('Usuário logado com sucesso:', response);
          // Redirecionar para a página principal ou outra página desejada
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
          // Lógica para exibir mensagem de erro ao usuário
        }
      );
  }
}
