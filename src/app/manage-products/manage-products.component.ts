import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('price') price!: ElementRef;

  constructor(private service: ProductService) { }
  dataTitle = 'Manage Products';
  editMode: boolean = false
  editIndex: number = 0;
  totalPrice: number = 0;
  isSelected = false;
  products: any[] = [
  ]

  ngOnInit(): void {
    this.getProducts();
    // get total price
    this.getTotal();


    // get total price sum

  }

  onAddProduct(id: any, name: any, price: any) {
    if (this.editMode) {
      this.products[this.editIndex] = {
        id: id.value,
        name: name.value,
        price: price.value
      }
      this.editMode = false;
      this.id.nativeElement.value = '';
      this.name.nativeElement.value = '';
      this.price.nativeElement.value = '';
    } else {
      this.products.push({
        id: id.value,
        name: name.value,
        price: price.value
      })

      id.value = '',
        name.value = '',
        price.value = ''
    }
    this.onSaveProduct();
  }
  onSaveProduct() {
    this.service.saveProduct(this.products).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )

  }

  getProducts() {
    this.service.getProducts().subscribe(
      (res) => {
        const data = JSON.stringify(res)
        this.products = JSON.parse(data)
      },
      (err) => console.log(err)
    )
  }



  onEdit(index: number, data: any) {
    this.editMode = true;
    this.editIndex = index;
    
    console.log(this.products[index]);
    this.id.nativeElement.value = this.products[index].id;
    this.name.nativeElement.value = this.products[index].name;
    this.price.nativeElement.value = this.products[index].price;
    this.isSelected = data;
  }
  onDelete(id: number) {
    if (confirm("Are you sure to delete this product?")) {

      this.products.splice(id, 1)
      this.onSaveProduct();
    }

  }

  getTotal() {
    //  get reduce price
    const total = this.products.reduce((acc, val) => acc += val.price, 0);
    this.totalPrice = total;
  }
}