import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from './user.model';
import { map } from 'rxjs/operators';

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
  isSelected = false;
  users: any[] = []


  constructor(private service: UserService) { }


  ngOnInit(): void {
    this.getAllUsers();
  }
  onAddUser(userData: User) {
    console.log(userData);
    this.service.addUser(userData).subscribe(data => {
      console.log(data)
      this.getAllUsers();
    });
    this.userForm.reset();
  }

  getAllUsers() {
    this.service.getUsers()
      .pipe(map(resData => {
        console.log(resData);
        const userArry: any[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            userArry.push({ userId: key, ...resData[key] });
          }
        }
        return userArry;
      }))
      .subscribe(data => {
        this.users = data;
        console.log(data);
      })
  }

  onEdit(id: number, data: any) { }
  onDelete(data: any) { }
}






