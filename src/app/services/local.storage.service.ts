import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private isBrowser: boolean = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

  constructor() {}

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}
