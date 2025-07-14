import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  constructor(
    protected http: HttpClient,
    @Inject('API_URL') private url: string
  ) {}

    findAll(){
      return this.http.get<T[]>(this.url);
    }
  
    findById(id: number){
  
      return this.http.get<T>(`${this.url}/${id}`);
  
    }
  
    findByAvailable(){
      return this.http.get<T[]> (`${this.url}/roomAvailable`);
    }
  
    save(data: T){
      return this.http.post(this.url, data);
    }
  
    update(id : number, data: T){
      return this.http.put(`${this.url}/${id}`, data);
    }
  
    delete(id: number){
      return this.http.delete(`${this.url}/${id}`);
    }
  
    listPageable(p: number, s: number){
      return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
      
    }
 
}
