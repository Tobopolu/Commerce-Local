import { Component, OnInit } from '@angular/core';
import { Shop } from '../../../interfaces/shop';
import { ShopsService } from '../../../services/shops.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-shopkeepersub',
  imports: [],
  templateUrl: './shopkeepersub.component.html',
  styleUrl: './shopkeepersub.component.css'
})
export class ShopkeepersubComponent   {
  shopData: Shop[] = [];
  filteredShops: Shop[] = [];
  shopS:ShopsService;
  toastr: ToastrService;
  baseUrl:string = environment.urlBase; 


  constructor( shopS: ShopsService, toastr: ToastrService) {
    this.shopS = shopS;
    this.toastr = toastr;
  }
  
    
  ngOnInit() {
    this.loadShops();
  }

  loadShops(){
    this.shopS.getAllShops().subscribe({
      next: (data:any) => {
        this.shopData=data;
        this.applyFilter();
        // console.log(this.shopData);
      },
      error: (error) => {
        console.error("Error fetching shops data: ", error);
      }
    });
  }
    
  handleShop(shop: Shop,action:number): void {
    if(action==2){
      if (confirm(`Voulez-vous vraiment valider l'inscription de la boutique : ${shop.name}?`)) {
        shop.id_shoprequest = 2; // Set status to "Validated"
        this.shopS.updateShopRequestStatus(shop.id_shop, 2).subscribe(() => {
          this.loadShops(); // Refresh list after update
        });
      }
    }
    else{
      if (confirm(`Voulez-vous vraiment refuser l'inscription de la boutique : ${shop.name}?`)) {
        shop.id_shoprequest = 3; // Set status to "Denied"
        this.shopS.updateShopRequestStatus(shop.id_shop, 3).subscribe(() => {
          this.loadShops(); // Refresh list after update
        });
      }
    }
  }
  
  selectedFilter: number | null = null;
  selectedFilterLabel: string = 'Tous'; // Default text for dropdown button

  selectFilter(value: number | null, label: string) {
    this.selectedFilter = value;
    this.selectedFilterLabel = label;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedFilter === null) {
      this.filteredShops = this.shopData;
    } else {
      this.filteredShops = this.shopData.filter(shop => shop.id_shoprequest === this.selectedFilter);
    }
    this.filteredShops.sort((a, b) => b.id_shop - a.id_shop);
  }
  
} 