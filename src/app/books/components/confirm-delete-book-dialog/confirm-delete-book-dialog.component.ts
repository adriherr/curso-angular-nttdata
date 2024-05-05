import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-confirm-delete-book-dialog',
  templateUrl: './confirm-delete-book-dialog.component.html',
  styles: ``
})
export class ConfirmDeleteBookDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
