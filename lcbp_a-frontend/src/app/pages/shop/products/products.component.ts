import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
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
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productsService.getProductsByShop(this.shopId).subscribe(products => {
      this.products = products;
    });
  }

}
