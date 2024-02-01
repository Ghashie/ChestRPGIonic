import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  
    username: string = '';
    email: string = '';
    password: string = '';
  
  constructor(private loginService: LoginService, private router: Router, private http: HttpClient) {}

  register() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    }

    this.http.post('http://localhost/ChestRPGIonic/api/api_usuario.php', userData).subscribe(response => {
      console.log(response);

      if (response && response.hasOwnProperty('idUser')) {
        // Se o usuário foi retornado, o cadastro foi bem-sucedido
        this.router.navigate(['/login']);
      } else {
        // Se o usuário não foi retornado, algo inesperado aconteceu
        console.error('Erro no cadastro:', response);
      }
    }, error => {
      console.error('Erro na requisição:', error);
    });
  }
}
