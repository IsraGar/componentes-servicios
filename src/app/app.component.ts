import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ){

  }

  ngOnInit():void {

  }

  createUser(){
    this.userService.create({
      "name": "Isra",
      "email": "isragarcia@mail.com",
      "password": "123456"
    })
    .subscribe(rta => {
      console.log(rta);      
    })
  }

  login(){
    this.authService.login("isragarcia@mail.com", "123456")
    .subscribe(rta => {
      console.log(rta.access_token);      
    })
  }

}
