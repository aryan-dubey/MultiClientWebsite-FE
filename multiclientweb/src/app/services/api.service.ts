import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:8080/addproduct/1",data)
  }

  getProduct(){
    return this.http.get<any>("http://localhost:8080/viewproduct")
  }

  putProduct(data : any, id : number){
    return this.http.put<any>(`http://localhost:8080/updateproduct/1/${id}`, data)

  }

  deleteProduct(id : number){
    return this.http.delete<any>(`http://localhost:8080/delproduct/1/${id}`)

  }  
}
