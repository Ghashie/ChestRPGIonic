import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router, private http: HttpClient) {}

  login() {
    const loginData = {
      username: this.username,
      password: this.password,
    };
    this.http.get(`http://localhost/ChestRPGIonic/api/api_usuario.php?usernameUser=${loginData.username}`).subscribe(response => {
      console.log(response);
      this.router.navigate(['/home']);
    }, error => {
      console.error(error);
    });
  }


}
