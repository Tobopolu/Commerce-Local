import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Schedule } from '../interfaces/schedule';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(private router:Router) { }
  private authenticated = false;
  http:HttpClient = inject(HttpClient);
  baseUrl:string = environment.urlBase; 

  insert(schedules: Schedule[]): Observable<any> {  
          
    let url = `${this.baseUrl}/schedules`;

    return this.http.post(url, {schedules});
  }

  getSchedulesByShop(id: number): Observable<any> {
    const url = `${this.baseUrl}/schedules/shop/${id}`;

    return this.http.get(url);
  }

  updateSchedule(id: number, scheduleData: any): Observable<any> {
    const url = `${this.baseUrl}/schedules/${id}`;
    
    return this.http.put(url, scheduleData);
  }

}
