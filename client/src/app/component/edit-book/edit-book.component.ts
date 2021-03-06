import { Component, OnInit } from '@angular/core';
import { BookModel } from '../book-list/book.model';
import { BooksService } from 'src/app/books.service';
import { Router } from '@angular/router';
import {AuthService} from 'src/app/auth.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookItem:any = new BookModel(0,'','','','',0,0,'');

  constructor(private booksService:BooksService,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.bookItem= this.booksService.hi();
  }
  
  editBook(){
    this.booksService.editBook(this.bookItem)
    console.log(" editbook and the corresponding book name is " + this.bookItem.bookName);
    alert("edited")
    this.router.navigate(['/book-list'])
  }

}