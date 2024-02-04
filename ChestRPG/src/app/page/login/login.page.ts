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

  constructor(private toastController: ToastController, private router: Router, private http: HttpClient) {}
 
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
  
    // Requisição para verificar o login
    const loginData = {
      emailUser: this.email,
      passwordUser: this.password,
    };
  
    this.http.get(`http://localhost/ChestRPGIonic/api/login.php?emailUser=${loginData.emailUser}&passwordUser=${loginData.passwordUser}`).subscribe(
      (response: any) => {
        // Verifica se a resposta está vazia (nenhum usuário encontrado)
        if (!response) {
          this.presentToast('Nenhum usuário encontrado. Verifique seu e-mail e senha.');
          return;
        }
  
        // Verifica se a senha fornecida coincide com a senha armazenada (usando password_verify)
        if (response && response.error) {
          this.presentToast('Credenciais inválidas. Verifique seu e-mail e senha.');
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(response));
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
