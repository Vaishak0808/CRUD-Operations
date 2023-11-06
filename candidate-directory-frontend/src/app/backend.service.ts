import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  address = "http://127.0.0.1:8000/"

  constructor(
    private http: HttpClient
    ) { }

    getData(url:any): Observable<any> {
      return this.http.get<any>(this.address + url);
    }

    deleteData(url:any): Observable<any> {
      return this.http.delete<any>(this.address + url);
    }

    putData(url:any, data:any): Observable<any> {
      return this.http.put<any>(this.address + url, data);
    }

    postData(url:any, data:any): Observable<any> {
      return this.http.post<any>(this.address + url, data);
    }
    
}
