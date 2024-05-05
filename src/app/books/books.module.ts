import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ViewBookDialogComponent } from './components/view-book-dialog/view-book-dialog.component';
import { ConfirmDeleteBookDialogComponent } from './components/confirm-delete-book-dialog/confirm-delete-book-dialog.component';
import { NewEditBookDialogComponent } from './components/new-edit-book-dialog-component/new-edit-book-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookImagePipe } from './pipes/book-image.pipe';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    ViewBookDialogComponent,
    ConfirmDeleteBookDialogComponent,
    NewEditBookDialogComponent,
    BookImagePipe
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BooksModule { }
