import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  userData = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router, private http: HttpClient) {}

  register() {
    this.http.post('http://localhost/ChestRPGIonic/api/api_usuario.php', this.userData).subscribe(
      (response) => {
        console.log('Cadastro realizado com sucesso!', response);
        // Adicione lógica de navegação ou outra ação após o cadastro
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro no cadastro:', error);
      }
    );
  }
}
