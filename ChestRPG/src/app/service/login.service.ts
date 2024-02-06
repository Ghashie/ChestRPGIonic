import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost/ChestRPGIonic/api/api_usuario.php';

  constructor(private http: HttpClient) { }

  private userData: any = null;

  setUserData(token: string, user: any): void {
    this.userData = { token, user };
  }

  getUserData(): any {
    return this.userData;
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user?idUser=${id}`);
  }

  updateUser(id: number, user: any, headers: any): Observable<any> {
    // Adicione o cabeçalho ao objeto de opções
    const options = { headers };
  
    return this.http.put(`${this.apiUrl}?idUser=${id}`, user, options);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?idUser=${id}`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, user);
  }

  loginUser(email: string, password: string): Observable<any> {
    const loginData = {
      emailUser: email,
      passwordUser: password
    };
  
    return this.http.get(`${this.apiUrl}/login?emailUser=${loginData.emailUser}&passwordUser=${loginData.passwordUser}`);
  }

  logout(): void {
    // Implemente a lógica de logout aqui
    // Por exemplo, remova tokens, limpe dados de sessão, etc.
    // Certifique-se de ajustar a lógica conforme a necessidade do seu aplicativo.
  }

  // Adicione mais métodos conforme necessário
}
