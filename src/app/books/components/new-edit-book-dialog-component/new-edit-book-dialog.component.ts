import { BooksService } from './../../services/books.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, Genre } from '../../interfaces/book.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-edit-book-dialog-component',
  templateUrl: './new-edit-book-dialog.component.html',
  styles: ''
})
export class NewEditBookDialogComponent implements OnInit {
  public addBookForm: FormGroup = this.formBuilder.group({
    id: [null],
    title: ['', Validators.required],
    genre: ['', Validators.required],
    description: [''],
    author: ['', Validators.required],
    publisher: ['', Validators.required],
    published: ['', Validators.required],
    isbn: ['', Validators.required],
    image: ['']
  })
  constructor(
    private dialogRef: MatDialogRef<NewEditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private snackBar: MatSnackBar,
  ) {}

  get currentBook(): Book {
    const book = this.addBookForm.value as Book;
    return book;
  }
  get genres(): Genre[] {
    return this.booksService.genres;
  }

  ngOnInit(): void {
    if (this.data) this.addBookForm.reset(this.data);
  }

  onSave(): void {
    const parseDate = (dateString: string): string => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
    this.currentBook.published = parseDate(this.currentBook.published)
    if (this.addBookForm.valid)
      if (!this.currentBook.id)
        this.booksService.addBook(this.currentBook)
          .subscribe(book => {
            this.dialogRef.close(true);
            this.showSnackBar(`${book.title} fue creado!`)
          });
      else this.booksService.editBook(this.currentBook)
            .subscribe(book => {
              this.dialogRef.close(true);
              this.showSnackBar(`${book.title} editado!`)
            });

  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'OK'), {
      duration: 2000
    }
  }
}
