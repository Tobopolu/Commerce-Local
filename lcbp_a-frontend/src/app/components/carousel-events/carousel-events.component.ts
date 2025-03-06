import { AfterViewInit, Component, ElementRef, inject, OnInit } from '@angular/core'; // AfterViewInit permet d'exécuter du code après le rendu de la vue et ElementRef permet d'accéder aux éléments DOM directement
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { Event } from '../../interfaces/event';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-carousel-events',
  imports: [],
  templateUrl: './carousel-events.component.html',
  styleUrl: './carousel-events.component.css'
})
export class CarouselEventsComponent implements OnInit {

  constructor(private elRef: ElementRef) {}

  eventS=inject(EventsService);
  router=inject(Router);
  events:Event[]=[];
  baseUrl:string = environment.urlBase; 


  
  ngOnInit(): void {
    this.eventS.getEvents().subscribe({
      next: (data) => {
        // console.log(data);
        this.events=data; 
        console.log(this.events);
        
      },
      complete:()=>{
        setTimeout(() => {
          this.initializeCarousel();
        }, 1000);
      },
      error: (e)=>{
        console.log(e);
      }
    });
}

  initializeCarousel() {
    const carousel: HTMLElement | null = this.elRef.nativeElement.querySelector(".carousel");
    if (!carousel) {
      console.warn("Carousel not found");
      return;
    }

    const firstImage: HTMLImageElement | null = carousel.querySelector("img");
    if (!firstImage) {
      console.warn("First image not found inside carousel");
      return;
    }

    const arrowIcons: NodeListOf<HTMLElement> = this.elRef.nativeElement.querySelectorAll(".wrapper i");
    if (arrowIcons.length === 0) {
      console.warn("Arrow icons not found!");
      return;
    }

    // Scroll function
    const scrollCarousel = (direction: "left" | "right"): void => {
      const cardWidth: number = firstImage.clientWidth + 14; 
      const maxScroll: number = carousel.scrollWidth - carousel.clientWidth;
      const scrollAmount: number = direction === "right" ? cardWidth : -cardWidth;

      carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);
    };

    // Add event listeners
    arrowIcons.forEach((icon: HTMLElement) => {
      icon.addEventListener("click", () => {
        const direction: "left" | "right" = icon.id === "right" ? "right" : "left";
        scrollCarousel(direction);
      });
    });

    
  }

  navToEvent(id:number){
    this.router.navigateByUrl(`shop/${id}/events`);
  }
}
