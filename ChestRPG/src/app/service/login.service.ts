import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost/ChestRPGIonic/api';

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro.php`, user);
  }

  loginUser(username: string, password: string): Observable<any> {
    const loginData = {
      usernameUser: username,
      passwordUser: password
    };
  
    return this.http.post(`${this.apiUrl}/login.php`, loginData);
  }

  logout(): void {
    // Implemente a lógica de logout aqui
    // Por exemplo, remova tokens, limpe dados de sessão, etc.
    // Certifique-se de ajustar a lógica conforme a necessidade do seu aplicativo.
  }

  // Adicione mais métodos conforme necessário
}
