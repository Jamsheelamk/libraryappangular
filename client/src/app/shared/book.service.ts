import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Books } from './books.model';

@Injectable({
  providedIn: 'root'
  
})
export class BookService {
   selectedBook:any= Books;
   books:Books[]=[];
  readonly baseURL="http://localhost:3000/book";
  // server_address: string = 'api';


 
  constructor( private http: HttpClient) { }
  postBook(book: Books){
      return this.http.post(this.baseURL,book)
      // return this.http.post<any>(`${this.server_address}/book`,book)
  }
getBookList(){
  return this.http.get(this.baseURL);
  // return this.http.get<any>(`${this.server_address}/book`)

}
}
