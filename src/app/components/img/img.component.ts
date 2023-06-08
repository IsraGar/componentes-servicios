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
    console.log('Constructor', 'imgValue => ', this.img);
  }
  ngOnDestroy(): void {
    //delete component
    console.log('ngOnDestroy');
  }

  ngAfterViewInit(): void {
    //After render
    //handler children
    console.log('AfterViewInit'); 
  }

  ngOnInit():void {
    //Before render
    //async -fetch --once time
    console.log('OnInit', 'imgValue => ', this.img);
  }

  ngOnChanges(){
    //before - during render
    //changes inputs --times
    console.log('OnChanges', 'imgValue => ', this.img);    
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
