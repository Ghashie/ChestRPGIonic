import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private apiUrl = 'http://localhost/ChestRPGIonic/api/api_members.php';

  constructor(private http: HttpClient) { }

  getMembers(tableId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/${tableId}`);
  }

  addMember(memberData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_member`, memberData);
  }

  removeMember(memberId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove_member/${memberId}`);
  }

  joinTableByCode(codeTable: string): Observable<any> {
    const requestData = {
      codeTable: codeTable
    };

    return this.http.post(`${this.apiUrl}/join`, requestData);
  }
}
