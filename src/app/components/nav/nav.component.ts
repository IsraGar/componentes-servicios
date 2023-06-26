import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.mode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  activeMenu: boolean = false;
  counter: number = 0;
  token = '';
  profile: User = {
    id: '',
    email: '',
    password: '',
    name: ''
  }

  constructor(
    private storeService: StoreService,
    private authService : AuthService){

  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(
      products => {
        this.counter = products.length;
      }
    );
  }

  toggleMenu(){       
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('isragarcia@mail.com', '123456')
    .subscribe(rta => {
      this.token = rta.access_token;
      this.getProfile();
    })
  }

  getProfile(){
    this.authService.profile()
    .subscribe(user => {
      this.profile = user;
    })
  }

}
