import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-view-book-dialog',
  templateUrl: './view-book-dialog.component.html',
  styles: ``
})
export class ViewBookDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
