import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { ShopsService } from '../../../../services/shops.service';
import { ToastrService } from 'ngx-toastr';
import { Shop } from '../../../../interfaces/shop';
import { CommonModule } from '@angular/common';
import { User } from '../../../../interfaces/user';
import { AuthService } from '../../../../services/auth.service';
import { SchedulesService } from '../../../../services/schedules.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-my-infos',
  imports: [FormsModule, CommonModule],
  templateUrl: './my-infos.component.html',
  styleUrl: './my-infos.component.css'
})
export class MyInfosComponent implements OnInit {

  userId: number = 0;

  constructor(
    private shopsService: ShopsService, 
    private authService: AuthService, 
    private toastr: ToastrService, 
    private schedulesService: SchedulesService
  ) {}
  
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

  selectedPhoto?:File;
  selectedLogo?: File;
  baseUrl:string = environment.urlBase; 
  

  ngOnInit() {
    // this.getShopInfo();
    this.loadShopData();
  }

  // getShopInfo() {
  //   this.shopsService.getShopById(this.shopId).subscribe({
  //     next: (response: Shop) => {
  //       this.shop = response;
  //     },
  //     error: (error) => {
  //       this.toastr.error('Erreur lors du chargement des informations de la boutique', error.message);
  //     }
  //   });
  // }

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
      next: (shop) => {
        this.shop = shop[0];;
        console.log("Shop récupéré :", this.shop);
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la récupération du shop", error.message);
      }
    });
  }

  // getShopInfoByUser(userId: number) {
  //   this.shopsService.getShopByUserId(userId).subscribe({
  //     next: (shops) => {
  //       console.log("Shops récupérés :", shops);
  //       if (shops.length > 0) {
  //         this.shop = shops[0]; // Prendre le premier élément
  //       } else {
  //         console.warn("Aucun shop trouvé pour cet utilisateur.");
  //       }
  //     },
  //     error: (error) => {
  //       console.error("Erreur lors de la récupération du shop :", error);
  //       this.toastr.error("Erreur lors de la récupération du shop", error.message);
  //     }
  //   });
  // }
  

  onLogoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedLogo = file;
    }
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhoto = file;
    }
  }

  formatPhone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.slice(0, 10);
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1-').slice(0, 14);
    input.value = formattedValue;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
  
      if (this.shop.name) formData.append('name', this.shop.name);
      if (this.shop.siret) formData.append('siret', this.shop.siret);
      if (this.shop.description) formData.append('description', this.shop.description);
      if (this.shop.address) formData.append('address', this.shop.address);
      if (this.shop.phone) formData.append('phone', this.shop.phone);
      if (this.shop.logo) formData.append('logo', this.shop.logo);
      if (this.shop.image) formData.append('image', this.shop.image);
  
      if (this.selectedPhoto) {
        formData.append('photo', this.selectedPhoto);
      }
      if (this.selectedLogo) {
        formData.append('logo', this.selectedLogo);
      }
  
      this.shopsService.updateShop(this.shop.id_shop, formData).subscribe({
        next: (response) => {
          this.toastr.success('Boutique mise à jour avec succès !');
          console.log('Réponse du serveur :', response);
        },
        error: (error) => {
          this.toastr.error('Erreur lors de la mise à jour de la boutique', error.message);
          console.error('Erreur du serveur :', error);
        }
      });
    } else {
      this.toastr.warning('Veuillez remplir tous les champs obligatoires', 'Formulaire invalide');
    }
  }
  
  

}
  
