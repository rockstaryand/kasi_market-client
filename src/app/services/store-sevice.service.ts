import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private baseUrl = environment.apiUrl.stores;

  constructor(private http: HttpClient) {}

  // Get store details by store ID
  getStoreById(storeId: string | null): Observable<any> {
    const url = `${this.baseUrl}/${storeId}`;
    return this.http.get(url);
  }

  // Optionally, a method to get all stores
  getAllStores(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }

  getProductsFromStore(storeId: string): Observable<any>{
    const url = `${this.baseUrl}/${storeId}/products`;
    return this.http.get(url);
  }
}
