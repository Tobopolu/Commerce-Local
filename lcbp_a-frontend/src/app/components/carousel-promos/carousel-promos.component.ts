import { Component, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carousel-promos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-promos.component.html',
  styleUrls: ['./carousel-promos.component.css']
})
export class CarouselPromosComponent implements OnInit {
  baseUrl:string = environment.urlBase; 

  @ViewChild('ctn', { static: false }) container!: ElementRef;

  router = inject(Router);
  prodS = inject(ProductsService);
  
  prods:Product[]=[];
  ngOnInit(): void {
    const frames = window.innerWidth<=768?3:8;
    this.prodS.getAllPromos().subscribe({
      next: (data)=>{
        for (let i = 0; i < frames; i++) {
          const rng = Math.floor(Math.random() * data.length);
          this.prods.push(data[rng]); 
          data.splice(rng,1);

        }
      },
      error:()=>{

      }
    });

    // window.onresize = this.reload;
      
  }
  // reload(){
  //   console.log("reload");
    
  //   // this.router.navigateByUrl('/',{skipLocationChange:true});
  // }    

  // ngAfterViewInit() {
  //   setInterval(()=>this.moveCards(0),5000);
  // }

  moveCards(i:number) {
    const container = this.container.nativeElement;
    const cards = container.querySelectorAll('.card');

    const movedCard = cards[i];
    if(i){
      gsap.to(movedCard, {
        x: `300%`,
        duration: 0.3,
        ease: 'power1.inOut',
        onComplete: () => {
          container.prepend(movedCard);
          gsap.set(movedCard, { x: `-300%` });
          gsap.to(movedCard, { x: '0%', duration: 0.3, ease: 'power1.inOut' });
        }
      });
    }
    else{
      gsap.to(movedCard, {
        x: `-300%`,
        duration: 0.3,
        ease: 'power1.inOut',
        onComplete: () => {
          container.appendChild(movedCard);
          gsap.set(movedCard, { x: `300%` });
          gsap.to(movedCard, { x: '0%', duration: 0.3, ease: 'power1.inOut' });
        }
      });
    }
  }

  scroll(event:Event,id:number){

    const clickedElement = event.target as HTMLElement;
    const cardElements = Array.from(document.querySelectorAll('.ctn .card')); // Get fresh list of elements
    const index = cardElements.indexOf(clickedElement.closest('.card') as HTMLElement);
    console.log('Clicked card index:', index);
    if(index<3){
      this.moveCards(7);
    }
    else if(index>4){
      this.moveCards(0);      
    }
    else{
      this.router.navigate([`/product/${id}`]);

    }

  }
}
