import { Component, OnInit } from '@angular/core';
import { Book, Genre } from '../../interfaces/book.interface';
import { BooksService } from '../../services/books.service';
import { SharedTableColumn } from '../../../shared/interfaces/shared-table-column.interface';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookDialogComponent } from '../../components/view-book-dialog/view-book-dialog.component';
import { DateAdapter } from '@angular/material/core';
import { ConfirmDeleteBookDialogComponent } from '../../components/confirm-delete-book-dialog/confirm-delete-book-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewEditBookDialogComponent } from '../../components/new-edit-book-dialog-component/new-edit-book-dialog.component';

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public books: Book[] = [];
  public booksTableCols: SharedTableColumn[] = [
    {name: 'title', label: 'Título'},
    {name: 'author', label: 'Autor'},
    {name: 'genre', label: 'Género'}
  ];
  public selectedGenre?: string;
  public dateStart?: string;
  public dateEnd?: string;

  constructor(
    private booksService: BooksService,
    private viewDialog: MatDialog,
    private removeDialog: MatDialog,
    private addEditDialog: MatDialog,
    private dateAdapter: DateAdapter<any>,
    private snackBar: MatSnackBar,
  ) { }

  get genres(): Genre[] {
    return this.booksService.genres;
  }

  ngOnInit(): void {
    this.fetchBooks();
    this.dateAdapter.setLocale('es');
  }

  fetchBooks(): void {
    this.booksService.getBooks()
      .subscribe(books => this.books = books);
  }

  view(rowToView: Object): void {
    this.viewDialog.open(ViewBookDialogComponent, {
      data: rowToView,
      height: '65%',
      width: '45%'
    });
  }

  edit(book: Book): void {
    const dialogRef = this.addEditDialog.open(NewEditBookDialogComponent, {
      height: 'auto',
      width: '60%',
      data: book
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) this.fetchBooks();
      }
    );
  }

  remove(book: Book): void {
    const dialogRef = this.removeDialog.open(ConfirmDeleteBookDialogComponent, {
      data: book
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.booksService.removeBook(book.id)
        .subscribe(deletedResult => {
          if (deletedResult) {
            this.showSnackBar(`${book.title} eliminado`);
            this.fetchBooks();
          }
        })
      }
    )
  }

  showAddFormDialog(): void  {
    const dialogRef = this.addEditDialog.open(NewEditBookDialogComponent, { height: 'auto', width: '60%'});
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) this.fetchBooks();
      }
    );
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'OK'), {
      duration: 2000
    }
  }

  searchByTitle(searchTerm: string): void {
    this.booksService.getBooksMatch(searchTerm)
      .subscribe(books => this.books = books)
  }
  setDates(dateStart: string, dateEnd: string): void {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
  }
  applyFilters(): void {
    const parseDate = (date: string) => {
      const dateArray = date.split('/');
      const [DD, MM, YYYY] = dateArray;
      return `${YYYY}-${MM}-${DD}`;
    }
    this.booksService.getBooks()
      .subscribe(books => this.books = books.filter(book => {
          console.log('published:', book.published);
          console.log('this.dateStart:', this.dateStart);
          const cumpleGenero = !this.selectedGenre || book.genre === this.genres.find(genre => genre === this.selectedGenre);
          const cumpleFechaInicio = !this.dateStart || new Date(book.published).setHours(0,0,0,0) >= new Date(parseDate(this.dateStart)).setHours(0,0,0,0);
          const cumpleFechaFin = !this.dateEnd || new Date(book.published).setHours(0,0,0,0) <= new Date(parseDate(this.dateEnd)).setHours(0,0,0,0);
          return cumpleGenero && cumpleFechaInicio && cumpleFechaFin;
        })
      )
  }
  clearFilters(genreInput: any, dateStart: any, dateEnd: any): void {
    this.selectedGenre = undefined;
    this.dateStart = undefined;
    this.dateEnd = undefined;
    genreInput.value = undefined;
    dateStart.value = '';
    dateEnd.value = '';
  }
}
