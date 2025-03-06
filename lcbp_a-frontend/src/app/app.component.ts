import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { ShopsService } from './services/shops.service';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'lcbp_a-frontend';
  auth = inject(AuthService);

  onLogout(){
    this.auth.logout();
  }


  searchText: string = '';
  filteredShops: any[] = [];
  allShops: any[] = [];

  constructor(private shopsService: ShopsService, private router: Router) {
    // this.shopsService.getAllShops().subscribe(shops => {
    //   this.allShops = shops;
    // });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadShops();
    });
  }

  ngOnInit() {
    this.loadShops();
  }
  // ngOnInit() {
  //   this.loadShops();
  
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.filteredShops = [];  // Réinitialiser la liste des boutiques filtrées
  //       this.searchText = '';     // Réinitialiser le texte de recherche
  //     }
  //   });
  // }

  loadShops() {
    this.shopsService.getAllShops().subscribe(shops => {
      this.allShops = shops;
    });
  }

  filterResults() {
    if (!this.searchText.trim()) {
      this.filteredShops = [];
      return;
    }

    this.filteredShops = this.allShops.filter(shop =>
      shop.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  goToShop(shop: any) {
    this.router.navigate([`/shop/${shop.id_shop}`]);
    this.filteredShops = [];
    this.searchText = '';
  }

}
