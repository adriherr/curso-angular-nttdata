import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedTableColumn } from '../../interfaces/shared-table-column.interface';
import { Book } from '../../../books/interfaces/book.interface';

@Component({
  selector: 'shared-table',
  templateUrl: './shared-table.component.html',
  styles: ``
})
export class SharedTableComponent {

  @Input()
  public dataSource: Object[] = [];
  @Input()
  public columns: SharedTableColumn[] = [];
  public optionsCol: SharedTableColumn = { name: 'options', label: 'Opciones' }

  @Output()
  public onView = new EventEmitter<Object>();
  @Output()
  public onEdit = new EventEmitter<Book>();
  @Output()
  public onDelete = new EventEmitter<Book>();

  get allColumns(): SharedTableColumn[] {
    return [...this.columns, this.optionsCol];
  }
  get namedColumns(): string[] {
    return this.allColumns.map(column => column.name);
  }
  get columnLabels(): string [] {
    return this.allColumns.map(column => column.label);
  }

  emitRowOnView(row: Object): void {
    this.onView.emit(row);
  }
  emitRowOnEdit(row: Book): void {
    this.onEdit.emit(row);
  }
  emitRowIdOnDelete(row: Book): void {
    this.onDelete.emit(row);
  }
}
