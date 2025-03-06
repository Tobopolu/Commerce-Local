import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Router } from '@angular/router';
import { Event } from '../../../interfaces/event';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {

  router = inject(Router);
  eventS = inject(EventsService); 
  events:Event[]=[];
  sid!:number;
  baseUrl:string = environment.urlBase; 

  ngOnInit(): void {
      
    this.eventS.getEventsbyShop(Number(this.router.url.split('/')[2])).subscribe({
      next: (data) => {
        this.events = data; 
      },
      error: (e)=>{
        console.log(e);
        
      }
    });
  }
}
