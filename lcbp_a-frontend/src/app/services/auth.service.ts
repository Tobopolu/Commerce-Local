import { Injectable , inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  private authenticated = false;
  // private isAdmin = false;
  http:HttpClient = inject(HttpClient);
  baseUrl:string = environment.urlBase; 


  authenticationToken(token:string): Observable<any> {
    let url = `${this.baseUrl}/auth/token`;
    console.log(token);
    
    return this.http.post(url, {token}).pipe(
      tap((data) => {
        console.log(data);
        
        this.login();
      }),
      catchError((err: HttpErrorResponse) => {
        console.error("HELP: ", err.error);
        return throwError(() => err.error.error);
      })
    );

  }

  authenticationCredentials(form: object): Observable<any> {
    const userData = form;
    let url = `${this.baseUrl}/auth/login`;
  
    return this.http.post(url, userData).pipe(
      tap((data: any) => {
        console.log("datafrom authenticationCredentials : ",data.token);
        sessionStorage.setItem('LCBPauth', data.token);
        this.login();
      }),
      catchError((err: HttpErrorResponse) => {
        console.error("HELP: ", err.error.error);
        return throwError(() => err.error.error);
      })
    );
  }
  updateInfo(form:object,idu:number):Observable<any>{
    const userData = form;
    let url = `${this.baseUrl}/auth/update/${idu}`;
    return this.http.put(url, userData).pipe(
      tap((data: any) => {
        sessionStorage.setItem('LCBPauth', data);
      }),
      catchError((err: HttpErrorResponse) => {
        console.error("HELP: ", err.error.error);
        return throwError(() => err.error.error);
      })
    );
  }

  private login() {
    this.authenticated = true;
    // if(role=="admin") {this.isAdmin = true;}
    this.getRoleByEmail();
  }

  logout() {
    sessionStorage.removeItem('LCBPauth');
    this.authenticated = false;
    // this.isAdmin = false;
    this.router.navigate(["/"]);
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
  
  postCredentials(form:object) {    
    const userData = form;
    let url = `${this.baseUrl}/auth/signup`;
    this.http.post(url, userData).subscribe({
      next:(data:any)=>{},
      error:(err)=>{/*console.log("HELP : " + err)*/},
      complete:()=>{/*console.log('Registration successful!')*/}
    });
  }

  getUserCredentials(): Observable<User> {
    let token: any = sessionStorage.getItem('LCBPauth');  
  
    let url = `${this.baseUrl}/auth/userselect`;
    return this.http.post<User>(url, { token });
  }

  getRoleByEmail(): Observable<any>{
    let token: any = sessionStorage.getItem('LCBPauth');  
    let url = `${this.baseUrl}/auth/userrole`;
    return this.http.post<User>(url, { token });
  }
  
  updateRole(id:number,ir:number){
    let url = `${this.baseUrl}/auth/updaterole/${id}`;

    this.http.put(url, {ir}).subscribe({
      next:(data:any)=>{
        return data;
      },
      error:(err)=>{console.log("HELP : " + err)},
      complete:()=>{/*console.log('Registration successful!')*/}
    });
  }

  getAllUsersAndTheirFamily(): Observable<any> {
    let token: any = sessionStorage.getItem('LCBPauth');  
    let url = `${this.baseUrl}/auth/elpsykongroo`;
    return this.http.post<any>(url, { token });
  }

  getUserId(): Observable<any>{
    let token: any = sessionStorage.getItem('LCBPauth');  
    let url = `${this.baseUrl}/auth/userid`;
    return this.http.post<any>(url, { token });
  }

  deleteUser(id:number): Observable<any> {
    
    let url = `${this.baseUrl}/auth/delete/${id}`;
    return this.http.delete<any>(url);
  }

}

