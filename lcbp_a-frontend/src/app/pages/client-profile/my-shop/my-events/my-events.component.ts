import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ShopsService } from '../../../../services/shops.service';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from '../../../../services/events.service';
import { Shop } from '../../../../interfaces/shop';
import { User } from '../../../../interfaces/user';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-my-events',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent {

  constructor(private router:Router,
    private shopsService: ShopsService, 
    private authService: AuthService, 
    private toastr: ToastrService,
    private cdr:ChangeDetectorRef) {}
    baseUrl:string = environment.urlBase; 

    eventsService = inject(EventsService);

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
      events: [],
      products: [],
      promos: []
    };

  selectedImage?: File;

  onImageSelectedForCreate(event: any) {
    const file = event.target.files[0];
    if (file) {
        this.selectedImage = file;
    }
  }

  onImageSelectedForUpdate(event: any, eventId: number) {
    const file = event.target.files[0];
    if (file) {
        const event = this.shop.events.find(p => p.id_event === eventId);
        if (event) {
            event.selectedImage = file;
        } else {
            console.error("Produit non trouvé pour l'ID :", eventId);
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
        this.loadEvents(this.shop.id_shop);
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la récupération du shop", error.message);
      }
    });
  }

  loadEvents(shopId: number) {
    this.eventsService.getEventsbyShop(shopId).subscribe({
      next: (events) => {
        this.shop.events = events;
        console.log("Events récupérés :", this.shop.events);
      },
      error: (error) => {
        this.toastr.error("Erreur lors de la récupération des events", error.message);
      }
    });
  }

  onDelete(eventId: number) {
    if (confirm("Voulez-vous vraiment supprimer cet évènement ?")) {
      this.eventsService.deleteEvent(eventId).subscribe({
          next: () => {
            this.toastr.success('Évènement supprimé avec succès !', 'Succès');
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
      const eventData = new FormData();
      eventData.append("name", form.value.name);
      eventData.append("date", form.value.date);
      eventData.append("address", form.value.address);
      eventData.append("description", form.value.description);
      eventData.append("price", form.value.price);
      // if (form.value.promo !== null && form.value.promo !== undefined && form.value.promo !== '') {
      //   eventData.append("promo", form.value.promo);
      // } else {
      //   eventData.append("promo", '0');
      // }
      eventData.append("id_shop", this.shop.id_shop.toString());

      if (this.selectedImage) {
        eventData.append("images", this.selectedImage); 
      }

      this.eventsService.addEvent(eventData).subscribe(
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


  onUpdate(eventId: number, form: NgForm) {
    if (form.valid) {
        const updatedData = new FormData();
        updatedData.append("name", form.value.name);
        updatedData.append("description", form.value.description);
        updatedData.append("price", form.value.price);
        updatedData.append("date", form.value.date);
        updatedData.append("address", form.value.address);

        // Récupération du produit concerné
        const event = this.shop.events.find(p => p.id_event === eventId);
        if (!event) {
            console.error("Produit introuvable pour l'ID :", eventId);
            return;
        }

        // Si une nouvelle image est sélectionnée, l'ajouter à FormData
        if (event.selectedImage) {
            updatedData.append("images", event.selectedImage);
        } else {
            // Ajouter l'existingImage uniquement si aucune nouvelle image n'a été sélectionnée
            updatedData.append("existingImage", event.images);
        }

        this.eventsService.updateEvent(eventId, updatedData).subscribe(
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
