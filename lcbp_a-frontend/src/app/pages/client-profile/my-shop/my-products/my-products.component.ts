import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../../services/products.service';
import { ShopsService } from '../../../../services/shops.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/user';
import { Shop } from '../../../../interfaces/shop';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-my-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit {

  constructor(private router:Router,
    private shopsService: ShopsService, 
    private authService: AuthService, 
    private toastr: ToastrService,
    private cdr:ChangeDetectorRef) {}
    baseUrl:string = environment.urlBase; 

  productsService = inject(ProductsService);

    shop: Shop = { 
      id_shop: 0,
      id_user: 0,
      id_shoprequest: 0,
      name: '', 
      description: '',
      address: '',
      phone: '',
      siret: '',
      logo: '',
      image: '',
      legalproof: '',
      id_status: 0,
      products: [],
      events: [],
      promos: []
    };

  selectedImage?: File;

  onImageSelectedForCreate(event: any) {
    const file = event.target.files[0];
    if (file) {
        this.selectedImage = file;
    }
  }

  onImageSelectedForUpdate(event: any, productId: number) {
    const file = event.target.files[0];
    if (file) {
        const product = this.shop.products.find(p => p.id_product === productId);
        if (product) {
            product.selectedImage = file;
        } else {
            console.error("Produit non trouvé pour l'ID :", productId);
        }
    } 
  }

  userId: number = 0;

  ngOnInit() {
    this.loadShopData();
  }

  loadShopData() {
    this.authService.getUserId().subscribe({
      next: (user: User) => {
        this.userId = user.id_user; 
        this.getShopInfoByUser(this.userId);
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la récupération de l'utilisateur", error.message);
      }
    });
  }

  getShopInfoByUser(userId: number) {
    this.shopsService.getShopByUserId(userId).subscribe({
      next: (shops) => {
        this.shop = shops[0];
        console.log("Shop récupéré :", this.shop);
        this.loadProducts(this.shop.id_shop);
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la récupération du shop", error.message);
      }
    });
  }

  loadProducts(shopId: number) {
    this.productsService.getProductsByShop(shopId).subscribe({
      next: (products) => {
        this.shop.products = products;
        console.log("Produits récupérés :", this.shop.products);
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la récupération des produits", error.message);
      }
    });
  }

  onDelete(productId: number) {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      this.productsService.deleteProduct(productId).subscribe({
          next: () => {
            this.toastr.success('Produit supprimé avec succès !', 'Succès');
            this.loadShopData();
          },
          error: () => {
            this.toastr.error('Erreur lors de la suppression.', 'Erreur');
          }
      });
    }
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      const productData = new FormData();
      productData.append("name", form.value.name);
      productData.append("description", form.value.description);
      productData.append("price", form.value.price);
      productData.append("stock", form.value.stock);
      if (form.value.promo !== null && form.value.promo !== undefined && form.value.promo !== '') {
        productData.append("promo", form.value.promo);
      } else {
        productData.append("promo", '0');
      }
      productData.append("id_shop", this.shop.id_shop.toString());

      if (this.selectedImage) {
        productData.append("images", this.selectedImage); 
      }

      this.productsService.addProduct(productData).subscribe(
        {
          next: () => {
            this.toastr.success('Le produit a été ajouté avec succès!', 'Succès');
            // this.cdr.detectChanges();
            this.loadShopData();
          },
          error: (err) => {
            this.toastr.error('Une erreur est survenue lors de l\'ajout du produit. Veuillez réessayer.', 'Erreur');
          }
        }
      );
      
    } else {
      this.toastr.warning('Veuillez remplir tous les champs avant de soumettre.', 'Attention');
    }
  }


  onUpdate(productId: number, form: NgForm) {
    if (form.valid) {
        const updatedData = new FormData();
        updatedData.append("name", form.value.name);
        updatedData.append("description", form.value.description);
        updatedData.append("price", form.value.price);
        updatedData.append("stock", form.value.stock);
        updatedData.append("promo", form.value.promo);

        // Récupération du produit concerné
        const product = this.shop.products.find(p => p.id_product === productId);
        if (!product) {
            console.error("Produit introuvable pour l'ID :", productId);
            return;
        }

        // Si une nouvelle image est sélectionnée, l'ajouter à FormData
        if (product.selectedImage) {
            updatedData.append("images", product.selectedImage);
        } else {
            // Ajouter l'existingImage uniquement si aucune nouvelle image n'a été sélectionnée
            updatedData.append("existingImage", product.images);
        }

        this.productsService.updateProduct(productId, updatedData).subscribe(
            {
                next: () => {
                    this.toastr.success('Le produit a été mis à jour avec succès!', 'Succès');
                    // this.cdr.detectChanges();
                    this.loadShopData();
                },
                error: (err) => {
                    this.toastr.error('Une erreur est survenue lors de la mise à jour.', 'Erreur');
                    console.error('Erreur lors de la mise à jour du produit :', err);
                }
            }
        );
    } else {
        this.toastr.warning('Veuillez remplir tous les champs avant de soumettre.', 'Attention');
    }
}



  
}
