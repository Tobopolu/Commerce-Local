import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Schedule } from '../interfaces/schedule';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private router:Router) { }
  http:HttpClient = inject(HttpClient);
  baseUrl:string = environment.urlBase; 



  insert(formData: FormData): Observable<any> {  
          console.log(formData);
          
    let url = `${this.baseUrl}/shops`;

    return this.http.post(url, formData);
  }

  getShopById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/shops/${id}`);
  }

  getShopByCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/shops/category/${id}`);
  }

  getCategories(): Observable<any> {  
          
    let url = `${this.baseUrl}/categories`;

    return this.http.get(url);
  }
  
  getAllShops(): Observable<any> {
    
    let url = `${this.baseUrl}/shops`;

    return this.http.get(url);
  }

  getAllShopsProducts(): Observable<any> {
    
    let url = `${this.baseUrl}/products`;

    return this.http.get(url);
  }

  getAllShopsEvents(): Observable<any> {
    
    let url = `${this.baseUrl}/events`;

    return this.http.get(url);
  }

  updateShopRequestStatus(sid:number, state:number): Observable<any> {
    let url = `${this.baseUrl}/shops/requestate`;

    return this.http.put(url,{sid,state});

  }
  
  updateShopStatus(sid:number, status:number): Observable<any> {
    let url = `${this.baseUrl}/shops/state`;

    return this.http.put(url,{sid,status});

  }
  
  getDays(): Observable<any> {  
          
    let url = `${this.baseUrl}/days`;

    return this.http.get(url);
  }

  getHours(): Observable<any> {  
          
    let url = `${this.baseUrl}/hours`;

    return this.http.get(url);
  }

  getStates(): Observable<any> {  
          
    let url = `${this.baseUrl}/states`;

    return this.http.get(url);
  }

  updateShop(id: number, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/shops/${id}`;
    
    return this.http.put(url, formData);
  }

  getShopByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/shops/user/${userId}`);
  }


  

}


