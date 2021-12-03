import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Authors } from './authors.model';

@Injectable({
  providedIn: 'root'
  
})
export class AuthorsService {
   selectedAuthor:any= Authors;
   authors:Authors[]=[];
  readonly baseURL="http://localhost:3000/author";
  // server_address: string = 'api';
   
  // books:Book[];
  constructor( private http: HttpClient) { }
  postBook(author: Authors){
      return this.http.post(this.baseURL,author)
      // return this.http.post<any>(`${this.server_address}/author`,author)
  }
getAuthorList(){
  return this.http.get(this.baseURL);
  // return this.http.get<any>(`${this.server_address}/author`)

}
}
