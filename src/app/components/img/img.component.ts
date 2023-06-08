import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  constructor(){
    //Before render
    //Noasync --once time
  }
  ngOnDestroy(): void {
    //delete component
  }

  ngAfterViewInit(): void {
    //After render
    //handler children 
  }

  ngOnInit():void {
    //Before render
    //async -fetch --once time
  }

  ngOnChanges(){
    //before - during render
    //changes inputs --times  
  }

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = '../../../assets/images/default.png';

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    this.loaded.emit(this.img);   
  }

}
