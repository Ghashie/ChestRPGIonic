import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  
  private apiUrl = 'http://localhost/ChestRPGIonic/api/api_tables.php';

  constructor(private http: HttpClient) { }

  getTables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tables`);
  }

  createTable(tableData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_table`, tableData);
  }

  updateTable(tableId: number, tableData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update_table/${tableId}`, tableData);
  }

  deleteTable(tableId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_table/${tableId}`);
  }

  joinTable(code: string): Observable<any> {
    // Adjust the API endpoint as needed
    return this.http.post(`${this.apiUrl}/join_table`, { codeTable: code });
  }

  // Adicione mais métodos conforme necessário
}
