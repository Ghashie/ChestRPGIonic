import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  
  private apiUrl = 'http://localhost/ChestRPGIonic/api';

  constructor(private http: HttpClient) { }

  getTables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mesas.php`);
  }


  createTable(tableData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mesas.php`, tableData);
  }

  updateTable(tableId: number, tableData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/mesas.php?idTable=${tableId}`, tableData);
  }

  deleteTable(tableId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/mesas.php?idTable=${tableId}`);
  }

  joinTable(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/joinMesas.php`, { codeTable: code });
  }

  getDetalhesMesa(mesaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/mesas.php?idTable=${mesaId}`).pipe(
      map((response: any) => response[0]) // Tratar a resposta como um único objeto
    );
  }
}
