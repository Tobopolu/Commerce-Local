import { Component, OnInit } from '@angular/core';
import { Shop } from '../../../interfaces/shop';
import { ShopsService } from '../../../services/shops.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../interfaces/product';
import { Event } from '../../../interfaces/event';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-shops',
  imports: [],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css'
})
export class ShopsComponent   {
  shopData: Shop[] = [];
  filteredShops: Shop[] = [];
  shopS:ShopsService;
  toastr: ToastrService;
  
  selectedFilter: number | null = null;
  selectedFilterLabel: string = 'Tous';
  activeSection: { [shopId: number]: string } = {};
  baseUrl:string = environment.urlBase; 

  constructor( shopS: ShopsService, toastr: ToastrService) {
    this.shopS = shopS;
    this.toastr = toastr;
  }
  
    
  ngOnInit() {
    this.loadShops();
  }

  loadShops() {

    //fetch shopData[]
    this.shopS.getAllShops().subscribe({
      next: (data: any) => {
        this.shopData = data.map((shop: Shop) => ({
          ...shop,
          products: [],
          events: [],
          promos: []
        }));

        //base filter
        this.applyFilter();

        //set base nav of each shop
        this.shopData.forEach(shop => {
          this.setActiveSection(shop.id_shop, 'info');
        });

        //fetch and patches products[] into shopData[]
        this.shopS.getAllShopsProducts().subscribe({
          next: (products: Product[]) => {
            products.forEach(product => {
              this.shopData.forEach(shop => {
                if (product.id_shop === shop.id_shop) {
                  shop.products.push(product);
                  if(product.promo){
                    shop.promos.push(product);
                  }
                }
              });
            });
          },
          error: (error) => {
            console.error("Error fetching products data: ", error);
          }
        });

        //fetch and patches events[] into shopData[]
        this.shopS.getAllShopsEvents().subscribe({
          next: (events: Event[]) => {
            events.forEach(event => {
              this.shopData.forEach(shop => {
                if (event.id_shop === shop.id_shop) {
                  shop.events.push(event);
                }
              });
            });
          },
          error: (error) => {
            console.error("Error fetching products data: ", error);
          }
        });

        console.log(this.shopData);
      },
      error: (error) => {
        console.error("Error fetching shops data: ", error);
      }
    });
  }

  handleShop(shop: Shop,action:number): void {
    if(action==2){
      if (confirm(`Voulez-vous vraiment activer la boutique : ${shop.name}?`)) {
        shop.id_status = 2; // Set status to "Validated"
        this.shopS.updateShopStatus(shop.id_shop, 2).subscribe(() => {
          this.loadShops();
        });
      }
    }
    else{
      if (confirm(`Voulez-vous vraiment désactiver la boutique : ${shop.name}?`)) {
        shop.id_status = 1; // Set status to "Denied"
        this.shopS.updateShopStatus(shop.id_shop, 1).subscribe(() => {
          this.loadShops();
        });
      }
    }
  }

  selectFilter(value: number | null, label: string) {
    this.selectedFilter = value;
    this.selectedFilterLabel = label;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedFilter === null) {
      this.filteredShops = this.shopData.filter(shop => shop.id_shoprequest == 2);
    } else {
      this.filteredShops = this.shopData.filter(shop => shop.id_status === this.selectedFilter && shop.id_shoprequest == 2);
    }
    this.filteredShops.sort((a, b) => b.id_shop - a.id_shop);
  }
  

  setActiveSection(shopId: number, section: string) {
    this.activeSection[shopId] = section;
  }

  isActiveSection(shopId: number, section: string): boolean {
    return this.activeSection[shopId] === section;
  }
  roundNumber(num:Number){
    return Number(num.toFixed(2));
  }
} 