import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CretateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = '/api/products';

  constructor(private http: HttpClient) { }
  
  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3)
    );
  }

  getProduct(id: string){
    return this.http.get<Product>(this.apiUrl + '/' + id);
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.apiUrl, {
      params: {limit, offset}
    });
  }

  createProduct(dto: CretateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto);
  }

  updateProduct(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(this.apiUrl + '/' + id, dto);
  }

  deleteProduct(id: string){
    return this.http.delete<boolean>(this.apiUrl + '/' + id);
  }

}
