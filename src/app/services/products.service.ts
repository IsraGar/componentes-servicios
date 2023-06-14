import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CretateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) { }
  
  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .16 * item.price
        }
      }))
    );
  }

  getProduct(id: string){
    return this.http.get<Product>(this.apiUrl + '/' + id)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Ups esta fallando en el server');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No estás autorizado');
        }
        return throwError('Ups algo salió mal');
      })
    )
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.apiUrl, {
      params: {limit, offset}
    }).pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .16 * item.price
        }
      }))
    );
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
