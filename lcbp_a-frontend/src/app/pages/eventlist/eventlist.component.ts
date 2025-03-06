import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../interfaces/event';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-eventlist',
  imports: [CommonModule],
  templateUrl: './eventlist.component.html',
  styleUrl: './eventlist.component.css'
})
export class EventlistComponent implements OnInit {
  router = inject(Router);
  eventS = inject(EventsService);
  baseUrl:string = environment.urlBase; 

  events:Event[]=[];

  ngOnInit(): void {
      this.eventS.getEvents().subscribe({
        next: (data) => {
          // console.log(data);
          this.events = data; 
          console.log(this.events);
        },
        error: (e)=>{
          console.log(e);
          
        }
      });
  }

  navToEvent(id:number){
    this.router.navigateByUrl(`shop/${id}/events`);
    // this.mapsection.nativeElement.scrollIntoView({ behavior: 'smooth' , block:'center'})

  }
}
