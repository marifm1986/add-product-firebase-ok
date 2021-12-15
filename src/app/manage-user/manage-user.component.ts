import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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


  constructor(private service: UserService, private http: HttpClient) { }


  ngOnInit(): void {
    this.getAllUsers();
  }
  onAddUser(userData: User) {
    if(this.editMode){
      // ...
      this.editMode = false;
    }else{
      console.log(userData);
      this.service.addUser(userData).subscribe(data => {
        console.log(data)
        this.getAllUsers();
      });
    }
    
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

  onEdit(userId, index) {
    this.editMode = true;
    if(this.editMode){
      this.userForm.setValue({
        name: this.users[index].name,
        tech: this.users[index].tech
      })

    }
    
  }

  onDelete(userId) {
    this.http.delete('https://amproducts-a9503-default-rtdb.firebaseio.com/users/' + userId + '.json').subscribe(() => {
      console.log();
      this.getAllUsers();
    })
  }
}






