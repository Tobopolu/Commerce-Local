import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core'; 
import { CarouselEventsComponent } from '../../components/carousel-events/carousel-events.component';
import { CarouselPromosComponent } from '../../components/carousel-promos/carousel-promos.component';
import { MapComponent } from '../../components/map/map.component';
import { Category } from '../../interfaces/category';
import { ShopsService } from '../../services/shops.service';
import { Shop } from '../../interfaces/shop';
import { Router } from '@angular/router';
import { NominatimService } from '../../services/nominatim.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-homepage',
  imports: [CarouselEventsComponent, CarouselPromosComponent, MapComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  baseUrl:string = environment.urlBase; 
  shopS = inject(ShopsService);
  router = inject(Router);
  categories:Category[]=[];
  activeSection:number = 1;
  activeSectionIndex:number = 0;
  shoplist:Shop[]=[];
  catColors = [
    "#FFBF00",
    "#AA3F24",
    "#00652E",
    "#94AA24",
    "#A56D41",
    "#6A7F44"
  ];

  @ViewChild(MapComponent) map!: MapComponent;
  
  @ViewChild('mapsection') mapsection!: ElementRef;

results: any[] = [];

constructor(private nominatimService: NominatimService) {}


  ngOnInit(): void {
      this.shopS.getCategories().subscribe({
        next: (data)=>{
          this.categories=data;    
          this.shopS.getShopByCategory(this.activeSection).subscribe({
            next: (data2)=>{
              this.shoplist=data2;
              document.documentElement.style.setProperty("--col",this.catColors[this.activeSectionIndex]);
            },
            error: ()=>{
    
            }
          });
                
        },
        error: ()=>{

        }
      });
  }

  activeCategory(id:number){
    this.activeSection=id;
    this.activeSectionIndex=this.categories.findIndex((id)=>id.id_category==this.activeSection );
    
    this.shopS.getShopByCategory(this.activeSection).subscribe({
      next: (data2)=>{
        this.shoplist=data2;
        document.documentElement.style.setProperty("--col",this.catColors[this.activeSectionIndex]);
      },
      error: ()=>{

      }
    });
  }

  navToMap(adress:string){
      console.log(adress);
      
    this.nominatimService.searchLocation(adress).subscribe((data) => {
      this.results = data;
      this.map.setMarker(this.results[0].lat,this.results[0].lon);
      this.mapsection.nativeElement.scrollIntoView({ behavior: 'smooth' , block:'center'})
    });
  }

  navToShop(id:number){
    this.router.navigate([`/shop/${id}`])
  }
  
  navToEvent(){
    this.router.navigate([`/events`])
  }
}
