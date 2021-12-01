import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'https://amproducts-a9503-default-rtdb.firebaseio.com/products.json';

  constructor(private http: HttpClient) { }

  saveProduct(product: any[]) {
    return this.http.put(this.baseUrl, product)
  }
  getProducts(){
    return this.http.get(this.baseUrl)
  }
  deleteProduct(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
