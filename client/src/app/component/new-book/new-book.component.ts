import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/books.service';
import { Router } from '@angular/router';
import { BookModel } from '../book-list/book.model';
// import { HttpErrorResponse } from '@angular/common/http';
 


@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  title:String = "Add Book";
  constructor(private booksService: BooksService, private router:Router) { }
  bookItem = new BookModel(0,'','','','',0,0,'');

  ngOnInit() {
    
  }
  AddBook()
  {
    this.booksService.newBook(this.bookItem)
    console.log("Called");
    alert("Success");
    this.router.navigate(['/book-list']);
  }
}


 

