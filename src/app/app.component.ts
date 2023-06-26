import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  token = '';
  imgRta = '';
  
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fileService: FilesService
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
      this.token = rta.access_token;   
    })
  }

  getProfile(){
    this.authService.profile()
    .subscribe(profile => {
      console.log(profile);      
    });
  }

  downloadPDF(){
    console.log('Hola');    
    this.fileService.getFile('my-pdf', 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', 'application/pdf').subscribe();
  }

  onUpload(event : Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }
    
  }

}
