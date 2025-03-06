import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  baseUrl:string = environment.urlBase; 

  addProduct(productData: FormData): Observable<any> {

    let url = `${this.baseUrl}/products`;

    return this.http.post<any>(url, productData);
  }

  getProducts(): Observable<Product[]> {
    
    let url = `${this.baseUrl}/products`;

    return this.http.get<Product[]>(url);
  }

  updateProduct(id: number, productData: FormData): Observable<any> {
    const url = `${this.baseUrl}/products/${id}`;
    
    return this.http.put(url, productData);
  }

  getProductsByShop(shopId: number) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/shop/${shopId}`);
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${this.baseUrl}/products/${productId}`;
    
    return this.http.delete(url);
  }

  getPromotionalProducts(shopId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/shop/${shopId}`)
      .pipe(
        map(products => products.filter(product => product.promo !== null && product.promo > 0))
      );
  }
  
  getAllPromos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/promos`);
  }

  getProductById(productId: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
  }
  
  

}
