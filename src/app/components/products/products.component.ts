import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Product, CretateProductDTO, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import Swal from 'sweetalert2';

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

  limit = 10;
  offset = 0;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
 
  constructor(private storeService: StoreService,
              private productsService: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngAfterViewInit(): void {
    register();
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe(
      data => {
        this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';        
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        })
        this.statusDetail = 'error';
      }
    );
  }

  createNewProduct(){
    const product: CretateProductDTO = {
      title: 'Nuevo Producto',
      price: 444,
      images: [''],
      description: 'Nuevo producto desde el TS',
      categoryId: 1
    }
    this.productsService.createProduct(product)
    .subscribe(data => {
      console.log(data);
      this.products.unshift(data);    
    });
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'Nuevo titulo'
    }
    const id = this.productChosen.id;
    this.productsService.updateProduct(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.deleteProduct(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products =  this.products.concat(data);
      this.offset += this.limit;   
    });
  }

}
