import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;

  products: Product[] = [
    {
      id: '001',
      name: 'Toy',
      image: '../assets/images/toy.jpeg',
      price: 150
    },
    {
      id: '002',
      name: 'Airplane',
      image: '../assets/images/airplane.jpg',
      price: 120
    },
    {
      id: '003',
      name: 'Marble',
      image: '../assets/images/canica.jpeg',
      price: 20
    },
    {
      id: '004',
      name: 'Capri Ford',
      image: '../assets/images/capri-ford.jpg',
      price: 100
    },
    {
      id: '005',
      name: 'Van',
      image: '../assets/images/combi.jpg',
      price: 50
    },
    {
      id: '006',
      name: 'Luigi',
      image: '../assets/images/luigi.jpg',
      price: 50
    },
    {
      id: '007',
      name: 'Pikachu',
      image: '../assets/images/pikachu.jpg',
      price: 60
    },
    {
      id: '008',
      name: 'Pink Panter',
      image: '../assets/images/pink-panter.jpeg',
      price: 80
    },
    {
      id: '009',
      name: 'Ted Bear',
      image: '../assets/images/ted.jpg',
      price: 100
    },
    {
      id: '010',
      name: 'VW',
      image: '../assets/images/vochos.jpeg',
      price: 120
    }
  ];

  constructor(private storeService: StoreService){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

}
