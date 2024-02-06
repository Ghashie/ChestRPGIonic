import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private toastController: ToastController, private router: Router, private loginService: LoginService ,private http: HttpClient) {}
 
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  login() {
    // Verifica se todos os campos foram preenchidos
    if (!this.email || !this.password) {
      this.presentToast('Todos os campos são obrigatórios.');
      return;
    }
  
    this.loginService.loginUser(this.email, this.password).subscribe(
      (response: any) => {
        if (!response) {
          this.presentToast('Nenhum usuário encontrado. Verifique seu e-mail e senha.');
          return;
        }
  
        if (response && response.error) {
          this.presentToast('Credenciais inválidas. Verifique seu e-mail e senha.');
        } else {
          // Salve o token e outros dados do usuário no serviço de login
          this.loginService.setUserData(response.token, response.user);

          // Obtenha o ID do usuário armazenado para uso futuro
          const userId = response.user.idUser;
  
          // Navegue para a página de mesas ou execute outra lógica necessária
          this.router.navigate(['/mesas']);
        }
      },
      (error) => {
        console.error(error);
        this.presentToast('Erro ao realizar o login. Tente novamente.');
      }
    );
  }

}
