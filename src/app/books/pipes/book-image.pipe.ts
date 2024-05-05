import { Book } from './../interfaces/book.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookImage'
})
export class BookImagePipe implements PipeTransform {

  transform(book: Book): string {
    let img;

    if (book.image) img = book.image;
    else img = 'assets/images/no_book.png';

    return img;
  }

}
