import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewEditBookDialogComponent } from '../../components/new-edit-book-dialog-component/new-edit-book-dialog.component';

@Component({
  selector: 'layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent implements OnInit {

  constructor(
    private addDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addBook(): void {
    console.log('show dialog');
  //   const dialogRef = this.addDialog.open(NewEditBookDialogComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log({ result });
  //     console.log( book.id );
  //     if (result) this.booksService.removeBook(book.id)
  //       .subscribe(deletedResult => {
  //         if (deletedResult) {
  //           this.showSnackBar(`${book.title} eliminado`);
  //           this.fetchBooks();
  //         }
  //       })
  //     }
  //   )
  }
}
