import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;
  @ViewChild('userName') name!: ElementRef;
  @ViewChild('tech') tech!: ElementRef;

  editMode = false


  constructor(private service: ProductService) { }


  ngOnInit(): void {

  }
  onAddUser(userData: { name: string, tech: string }) {
    console.log(userData)
  }

}






