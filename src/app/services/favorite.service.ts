import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    []
  );
  private _storage: Storage | null = null;
  private favoritesKey: string = 'favorites';

  constructor(private storage: Storage) {
    // this.initFavorites();
  }
  // async init() {
  //   // If using, define drivers here: await this.storage.defineDriver(/*...*/);
  //   const storage = await this.storage.create();
  //   this._storage = storage;
  // }

  // Create and expose methods that users of this service can
  // call, for example:
  // public set(key: string, value: any) {
  //   this._storage?.set(key, value);
  // }

  // private initFavorites() {
  //   this.storage.get(this.favoritesKey).then((favorites: any) => {
  //     if (favorites) {
  //       this.favorites.next(favorites);
  //     } else {
  //       this.storage.set(this.favoritesKey, []);
  //     }
  //   });
  // }

  getFavorites() {
    return this.favorites.asObservable();
  }

  toggleFavorite(productId: number) {
    const favorites = this.favorites.getValue();
    const index = favorites.indexOf(productId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(productId);
    }
    // this.storage.set(this.favoritesKey, favorites);
    this.favorites.next(favorites);
  }

  isFavorite(productId: number) {
    const favorites = this.favorites.getValue();
    return favorites.includes(productId);
  }
}
