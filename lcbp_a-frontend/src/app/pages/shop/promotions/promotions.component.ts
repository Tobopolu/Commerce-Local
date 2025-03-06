import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, RouterModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent implements OnInit {

  promoProducts: Product[] = [];
  shopId!: number;
  baseUrl:string = environment.urlBase; 

  constructor(
      private productsService: ProductsService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la boutique depuis l'URL
    this.route.parent?.params.subscribe(params => {
      this.shopId = +params['id']; // Convertit l'ID en nombre
      this.loadPromoProducts();
    });
  }

  loadPromoProducts() {
    this.productsService.getPromotionalProducts(this.shopId).subscribe(
      products => {
        this.promoProducts = products;
      },
      error => {
        console.error('Erreur lors du chargement des promotions:', error);
      }
    );
  }
  

}
