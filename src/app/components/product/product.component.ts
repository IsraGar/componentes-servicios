import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  };

  @Output() addProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor(){ }

  ngOnInit(): void {

  }

  onAddToCart(){
    this.addProduct.emit(this.product);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id);   
  }

}
