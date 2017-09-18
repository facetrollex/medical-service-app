import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private storage: any;

  constructor () {
    this.storage = localStorage;
  }

  public read (table: string): any {
    return JSON.parse(this.storage.getItem(table)) || [];
  }

  public write (table: string, data: any): void {
    this.storage.setItem(table, JSON.stringify(data));
  }
}
