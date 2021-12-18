import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../manage-products/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'https://amproducts-a9503-default-rtdb.firebaseio.com/products.json';
  constructor(private _http: HttpClient) { }
// push user
  addProduct(product: Products) {
    return this._http.post<Products>(this.baseUrl, product);
  }

  getProduct() {
    return this._http.get<Products>(this.baseUrl);
  }

  deleteUser(productId: number) {
    return this._http.delete(this.baseUrl + '/' + productId);
  }
}
