import { Book, Genre } from './../interfaces/book.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class BooksService {

  private baseUrl: string = environment.baseUrl;
  private _genres: Genre[] = [Genre.ape, Genre.in, Genre.nam, Genre.und, Genre.ut, Genre.vol];

  constructor(private httpClient: HttpClient) { }

  get genres(): Genre[] {
    return [...this._genres];
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.baseUrl}/libros`)
  }
  getBooksMatch(query: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.baseUrl}/libros?title_like=${query}`)
  }
  removeBook(idBook: string | number): Observable<boolean> {
    if (!idBook) throw Error('Book id is missing!');
    return this.httpClient.delete(`${this.baseUrl}/libros/${idBook}`)
    .pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.baseUrl}/libros`, book);
  }
  editBook(book: Book): Observable<Book> {
    if (!book.id) throw Error('Book id is missing!');
    return this.httpClient.patch<Book>(`${this.baseUrl}/libros/${book.id}`, book);
  }

}
