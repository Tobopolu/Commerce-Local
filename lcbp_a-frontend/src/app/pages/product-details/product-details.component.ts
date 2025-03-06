import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  shopId: number | null = null;
  product: Product | null = null;
  baseUrl:string = environment.urlBase; 

  constructor(
      private productsService: ProductsService, 
      private router: Router, 
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.loadProduct(parseInt(productId));
    }
  }

  selectedQuantity: number = 1;
quantities: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

selectQuantity(qty: number) {
  this.selectedQuantity = qty;
}


  loadProduct(productId: number): void {
    this.productsService.getProductById(productId).subscribe((data: Product) => {
      this.product = data;
      this.shopId = data.id_shop;
    });
  }

  getDiscountedPrice(product: Product): number {
    if (product.promo && product.promo > 0) {
        return Math.round(product.price * (1 - product.promo / 100) * 100) / 100;
    }
    return product.price;
  }

  

  goToShop(): void {
    if (this.shopId) {
      this.router.navigate([`/shop/${this.shopId}`]);
    }
  }
  
}
