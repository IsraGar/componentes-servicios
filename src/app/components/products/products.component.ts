import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];

  showProductDetail: boolean = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  }
 
  constructor(private storeService: StoreService,
              private productsService: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngAfterViewInit(): void {
    register();
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;      
    });
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productsService.getProduct(id).subscribe(
      data => {
        this.toggleProductDetail();
        this.productChosen = data;        
      }
    );    
  }

}
