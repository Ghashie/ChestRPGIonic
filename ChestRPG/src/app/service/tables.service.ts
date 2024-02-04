import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  
  private apiUrl = 'http://localhost/ChestRPGIonic/api';

  constructor(private http: HttpClient) { }

  getTables(): Observable<any> {
    return this.http.get('http://localhost/ChestRPGIonic/api/mesas.php', { withCredentials: true })
    .subscribe(data => {
      // Processar a resposta
    }, error => {
      // Lidar com erros
    });
  }

  createTable(tableData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mesas.php`, tableData);
  }

  updateTable(tableId: number, tableData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/mesas.php/${tableId}`, tableData);
  }

  deleteTable(tableId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/mesas.php/${tableId}`);
  }

  joinTable(code: string): Observable<any> {
    // Adjust the API endpoint as needed
    return this.http.post(`${this.apiUrl}/joinMesas.php`, { codeTable: code });
  }

  // Adicione mais métodos conforme necessário
}
