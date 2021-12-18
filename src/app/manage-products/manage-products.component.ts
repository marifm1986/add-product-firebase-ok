import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { User } from '../manage-user/user.model';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Products } from './products';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;
  @ViewChild('userName') name!: ElementRef;
  @ViewChild('rate') rate!: ElementRef;
  editMode = false
  isSelected = false;
  products: Products[] = []


  constructor(private service: ProductService, private http: HttpClient) { }


  ngOnInit(): void {
    this.getAllProducts();
    this.getTotal();
  }
  onAddUser(productData: Products) {
    if(this.editMode){
      // ...
      this.editMode = false;
    }else{
      console.log(productData);
      this.service.addProduct(productData).subscribe(data => {
        console.log(data)
        this.getAllProducts();
      });
    }
    
    this.productForm.reset();
  }

  getAllProducts() {
    this.service.getProduct()
      .pipe(map(resData => {
        console.log(resData);
        const productArry: any[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            productArry.push({ productId: key, ...resData[key] });
          }
        }
        return productArry;
      }))
      .subscribe(data => {
        this.products = data;
        console.log(data);
      })
  }

  onEdit(productId, index) {
    this.editMode = true;
    if(this.editMode){
      this.productForm.setValue({
        name: this.products[index].name,
        rate: this.products[index].rate
      })

    }
    
  }

  getTotal(){
    let total = 0;
    this.products.forEach(element => {
      total += parseInt(element.rate);
    });
    return total;
  }

  onDelete(productId) {
    this.http.delete('https://amproducts-a9503-default-rtdb.firebaseio.com/products/' + productId + '.json').subscribe(() => {
      console.log();
      this.getAllProducts();
    })
  }
}
