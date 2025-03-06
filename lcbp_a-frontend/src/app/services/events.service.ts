import { Injectable } from '@angular/core';
import { Event } from '../interfaces/event';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {}

  baseUrl:string = environment.urlBase; 

  addEvent(eventData: FormData): Observable<any> {

    let url = `${this.baseUrl}/events`;

    return this.http.post<any>(url, eventData);
  }

  getEvents(): Observable<Event[]> {
    
    let url = `${this.baseUrl}/events`;

    return this.http.get<Event[]>(url);
  }
  
  getEventsbyShop(id:number): Observable<Event[]> {
    
    let url = `${this.baseUrl}/events/shop/${id}`;

    return this.http.get<Event[]>(url);
  }

  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.baseUrl}/events/${eventId}`;
    
    return this.http.delete(url);
  }

  updateEvent(id: number, eventData: FormData): Observable<any> {
    const url = `${this.baseUrl}/events/${id}`;
    
    return this.http.put(url, eventData);
  }
  // getEvent(id:number): Observable<Event> {
    
  //   let url = `${baseUrl}/events/:id`;

  //   return this.http.get<Event>(url);
  // }
}
