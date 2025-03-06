import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ShopsService } from '../../../services/shops.service';
import { SchedulesService } from '../../../services/schedules.service';
import { CommonModule } from '@angular/common';
import { TimeSlot } from '../../../interfaces/timeslot';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-shopkeeper-registration',
  imports: [FormsModule, CommonModule],
  templateUrl: './shopkeeper-registration.component.html',
  styleUrl: './shopkeeper-registration.component.css'
})
export class ShopkeeperRegistrationComponent implements OnInit {



    toastr = inject(ToastrService);
    auth = inject(AuthService);
    shopsService = inject(ShopsService);
    schedulesService = inject(SchedulesService);
    baseUrl:string = environment.urlBase; 

    formatPhone(event: Event) {
      const input = event.target as HTMLInputElement;
      let value = input.value.replace(/\D/g, ''); // Remove all non-digit characters
      value = value.slice(0, 10); // Limit to 10 digits
  
      // Add hyphens every 2 digits
      const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1-').slice(0, 14);
  
      input.value = formattedValue; // Update the input's value
    }

    // onFileSelected(event: any) {
    //   const file = event.target.files[0]; // Récupère le fichier sélectionné
    
    //   if (file) {
    //     const formData = new FormData();
    //     formData.append('image', file);  // Ajoute le fichier image au FormData
    
    //     // Vous pouvez maintenant envoyer formData au backend en l'ajoutant à une requête HTTP
    //     this.shopsService.insert(formData).subscribe(response => {
    //       // Traitez la réponse du serveur ici
    //     }, error => {
    //       // Gérer les erreurs
    //     });
    //   }
    // }


    selectedPhoto?:File;
    selectedLogo?: File;
    selectedFile?: File;
    categories: any[] = [];
    days: any[] = [];
    hours: any[] = [];
    states: any[] = [];
    selectedSchedules: { day: string, hours: { startHour: string, endHour: string }[] }[] = [];

    // Fonction pour gérer l'état de la case à cocher
    // onDayChecked(day: any) {
    //   // Si le jour est sélectionné (isOpen = true), ajoute un créneau horaire
    //   if (day.isOpen) {
    //     const startHourId = this.hours.find(hour => hour.hour === '09:00').id_hour;
    //     const endHourId = this.hours.find(hour => hour.hour === '12:00').id_hour;

    //     // Ajouter un créneau horaire par défaut si ce n'est pas déjà fait
    //     if (!day.timeSlots) {
    //       day.timeSlots = []; // Assurer que timeSlots existe
    //     }
    //     day.timeSlots.push({ startHour: startHourId, endHour: endHourId });

    //     // Optionnel : Ajouter un bouton "Ajouter" seulement s'il n'y en a pas déjà
    //     day.showAddButton = true;
    //   } else {
    //     // Si le jour n'est pas sélectionné, effacer les créneaux horaires
    //     day.timeSlots = [];
    //     day.showAddButton = false;  // Cacher le bouton "Ajouter"
    //   }
    // }
    

    onDayChecked(day: any) {
      if (day.isOpen) {
        day.timeSlots = day.timeSlots || []; // S'assurer que timeSlots existe
        const startHour = this.hours.find(hour => hour.hour === '09:00');
        const endHour = this.hours.find(hour => hour.hour === '12:00');
    
        if (!startHour || !endHour) {
          this.toastr.error('Les heures spécifiées ne sont pas disponibles.', 'Erreur');
          return;
        }
    
        day.timeSlots.push({ startHour: startHour.id_hour, endHour: endHour.id_hour });
      } else {
        day.timeSlots = [];
      }
    }
    
    

    // Fonction pour ajouter un créneau horaire
    addSlot(day: any) {
      const startHourId = this.hours.find(hour => hour.hour === '09:00').id_hour;
      const endHourId = this.hours.find(hour => hour.hour === '12:00').id_hour;
      
      if (!day.timeSlots) {
        day.timeSlots = [];
      }

      // Ajouter un nouveau créneau horaire
      day.timeSlots.push({ startHour: startHourId, endHour: endHourId });
    }

    // Fonction pour supprimer un créneau horaire
    deleteSlot(day: any, index: number) {
      day.timeSlots.splice(index, 1);
      // Si tous les créneaux sont supprimés, cacher le bouton "Supprimer"
      if (day.timeSlots.length === 0) {
        day.isOpen = false; // Décocher le jour
        day.showAddButton = false; // Masquer le bouton "Ajouter"
      }
    }



    ngOnInit() {
      this.shopsService.getCategories().subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error("Erreur lors du chargement des catégories", err);
        },
      });

      this.shopsService.getHours().subscribe({
        next: (data) => {
          this.hours = data;
          

          this.shopsService.getDays().subscribe({
            next: (data) => {
              this.days = data;
              this.days.forEach(day => {
                if (day.isOpen === undefined) {
                  day.isOpen = true;
    
                   // Ajouter un créneau par défaut "09:00 - 12:00"
                  if (!day.timeSlots) {
                    day.timeSlots = []; 
                  }
    
                  const startHourId = this.hours.find(hour => hour.hour === '09:00').id_hour;
                  const endHourId = this.hours.find(hour => hour.hour === '12:00').id_hour;
    
                  if (startHourId && endHourId) {
                    day.timeSlots.push({ startHour: startHourId, endHour: endHourId });
                  }else {
                    console.error('Heures de début ou de fin non trouvées.');
                  }
                }
              });
            },
            error: (err) => {
              this.toastr.error('Erreur lors du chargement des jours', 'Erreur');
            }
          });
        },
        error: (err) => {
          this.toastr.error('Erreur lors du chargement des horaires', 'Erreur');
        }
      });



      this.shopsService.getStates().subscribe({
        next: (data) => {
          this.states = data;
        },
        error: (err) => {
          this.toastr.error('Erreur lors du chargement des états', 'Erreur');
        }
      });

      // this.shopsService.getShopById(this.shopId).subscribe(data => {
      //   this.shop = data;
      //   this.imageUrl = 'http://localhost:81' + this.shop.image;
      // });


    }

    // onFileSelected(event:any){
    //   const file = event.target.files[0];
    //   if(file){
    //     this.selectedFile = file;
  
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       this.imagePreview = reader.result as string;
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // }

    // Gestion de la sélection de la photo
    onPhotoSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        // // Validation du type de fichier
        // const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        // if (!allowedTypes.includes(file.type)) {
        //   this.toastr.error('Seules les images JPEG et PNG sont autorisées.', 'Erreur');
        //   return;
        // }
    
        // // Validation de la taille du fichier (par exemple, maximum 5MB)
        // if (file.size > 5 * 1024 * 1024) {
        //   this.toastr.error('Le fichier est trop grand. La taille maximale est de 5 Mo.', 'Erreur');
        //   return;
        // }
    
        this.selectedPhoto = file;
    
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
      }
    } 

    onLogoSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.selectedLogo = file;
      }
    }

    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    }

    // onSubmit(form: NgForm) {

    //   if (form.valid) {

    //     // const formData = form.value; 

    //     const formData = new FormData();

    //     // Ajouter les champs du formulaire au FormData
    //     Object.keys(form.value).forEach(key => {
    //       if (key !== 'photo' && key !== 'logo' && key !== 'legalproof') { // Exclure 'photo' et 'logo'
    //         formData.append(key, form.value[key]);
    //       }
    //     });

    //     // Ajouter l'image si elle est présente
    //     if (this.selectedPhoto) {
    //       formData.append('photo', this.selectedPhoto);
    //     } else {
    //       this.toastr.error('Veuillez sélectionner une image.', 'Erreur');
    //       return;
    //       }

    //     // Ajouter le logo
    //     if (this.selectedLogo) {
    //       formData.append('logo', this.selectedLogo);
    //     } else {
    //       this.toastr.error('Veuillez sélectionner un logo.', 'Erreur');
    //       return;
    //     }

    //     // Ajouter le justificatif
    //     if (this.selectedFile) {
    //       formData.append('legalproof', this.selectedFile);
    //     } else {
    //       this.toastr.error('Veuillez sélectionner un justificatif.', 'Erreur');
    //       return;
    //     }

    //     // Ajouter les horaires d'ouverture sélectionnés
    //     const selectedSchedules = this.days
    //     .filter(day => day.isOpen)  // Filtrer les jours où l'on a des horaires
    //     .map(day => ({
    //       day: day.day,  // Nom du jour
    //       hours: day.timeSlots.map((timeSlot: TimeSlot) => ({
    //         hour: this.hours.find(hour => hour.id_hour === timeSlot.startHour).hour,  // Heure de début
    //         state: timeSlot.state  // État (open/close)
    //       }))
    //     }));

 
    //     formData.append('schedules', JSON.stringify(selectedSchedules));  // Ajouter les horaires sous forme JSON
      

    //     // Envoyer les données au backend
    //     this.shopsService.insert(formData).subscribe({
    //       next: () => {
    //         this.toastr.success('Boutique créé avec succès!', 'Succès', { timeOut: 1000 });
    //       },
    //       error: (err) => {
    //         this.toastr.error('Une erreur s\'est produite lors de la création de la boutique.', 'Erreur', { timeOut: 1000 });
    //         console.error('Error creating shop:', err);
    //       }
    //     });

    //   } else {
    //     this.toastr.error("Veuillez renseigner tous les champs", "Erreur", { timeOut: 1000 });
    //   }
    // }

    getDayId(dayName: string): number {
      const day = this.days.find(d => d.day === dayName);
      return day ? day.id_day : -1; // Return -1 if no day is found
    }

    
    
  //   onSubmit(form: NgForm) {
      
  //     if (form.valid) {
        
  //         const formData = new FormData();

  
  //         // Ajouter les champs du formulaire au FormData
  //         Object.keys(form.value).forEach(key => {
  //             if (key !== 'photo' && key !== 'logo' && key !== 'legalproof') {
  //                 formData.append(key, form.value[key]);
  //             }
  //         });
  
  //         // Ajouter les fichiers
  //         if (this.selectedPhoto) {
  //             formData.append('photo', this.selectedPhoto);
  //         } else {
  //             this.toastr.error('Veuillez sélectionner une image.', 'Erreur');
  //             return;
  //         }
  
  //         if (this.selectedLogo) {
  //             formData.append('logo', this.selectedLogo);
  //         } else {
  //             this.toastr.error('Veuillez sélectionner un logo.', 'Erreur');
  //             return;
  //         }
  
  //         if (this.selectedFile) {
  //             formData.append('legalproof', this.selectedFile);
  //         } else {
  //             this.toastr.error('Veuillez sélectionner un justificatif.', 'Erreur');
  //             return;
  //         }
          
  
  //         const schedules = this.days.map(day => {
  //           return {
  //             id_day: day.id_day,
  //             // state: day.isOpen ? 1 : 2,
  //             hours: day.isOpen ? day.timeSlots.flatMap((slot: { startHour: number, endHour: number }) => [
  //               { id_hour: slot.startHour },  // Entrée pour startHour
  //               { id_hour: slot.endHour }    // Entrée pour endHour
  //             ])
  //           : [] // Si fermé, pas d'horaires
  //           };
  //         });

  //         console.log("Horaires préparés :", schedules);
  //         console.log("Horaires en JSON :", JSON.stringify(schedules));
          
  //         // console.log('--- Vérification des horaires sélectionnés ---', schedules);
  //         // console.log('JSON des horaires:', JSON.stringify(schedules));
          
  //         formData.append('schedules', JSON.stringify(schedules));
        
  //         // console.log('Données envoyées:');
  //         // formData.forEach((value, key) => {
  //         //   console.log(key, value);
  //         // });
          

  
  //         // Envoyer les données au backend
  //         this.shopsService.insert(formData).subscribe({
  //           next: () => {
  //               // Ensuite, envoyer les horaires (schedules)
  //               this.schedulesService.insert(formData).subscribe({
  //                   next: () => {
  //                       this.toastr.success('Emploi du temps créé avec succès!', 'Succès', { timeOut: 1000 });
  //                   },
  //                   error: (err) => {
  //                       this.toastr.error('Une erreur s\'est produite lors de la création de schedule.', 'Erreur', { timeOut: 1000 });
  //                       console.error('Error creating schedule:', err);
  //                   }
  //               });
  //           },
  //           error: (err) => {
  //               this.toastr.error('Une erreur s\'est produite lors de la création de la boutique.', 'Erreur', { timeOut: 1000 });
  //               console.error('Error creating shop:', err);
  //           }
  //       });
  //     } else {
  //         this.toastr.error("Veuillez renseigner tous les champs", "Erreur", { timeOut: 1000 });
  //     }
  // }


  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      let idUser:number;
  
      // Ajouter les champs du formulaire au FormData (données de la boutique)
      Object.keys(form.value).forEach(key => {
        if (key !== 'photo' && key !== 'logo' && key !== 'legalproof') {
          formData.append(key, form.value[key]);
        }
      });
  
      // Ajouter les fichiers
      if (this.selectedPhoto) {
        formData.append('photo', this.selectedPhoto);
      } else {
        this.toastr.error('Veuillez sélectionner une image.', 'Erreur');
        return;
      }
  
      if (this.selectedLogo) {
        formData.append('logo', this.selectedLogo);
      } else {
        this.toastr.error('Veuillez sélectionner un logo.', 'Erreur');
        return;
      }
  
      if (this.selectedFile) {
        formData.append('legalproof', this.selectedFile);
      } else {
        this.toastr.error('Veuillez sélectionner un justificatif.', 'Erreur');
        return;
      }
  
  
      this.auth.getUserId().subscribe({
        next: (data:any) => {
          idUser=data.id_user;
          this.auth.updateRole(idUser,2);
          formData.append('id_user',idUser.toString());
      
          // Envoyer les données de la boutique au backend
          this.shopsService.insert(formData).subscribe({
            next: (shopResponse) => {
              console.log("supposed id shop",shopResponse.shopId);
              console.log(shopResponse);
              
              // Une fois la boutique créée, récupérer l'ID de la boutique et préparer les horaires
              const shopId = shopResponse.shopId; // Supposons que la réponse contient l'ID de la boutique
      
              // Préparer les horaires
              const schedules = this.days.map(day => {
                return {
                  shopId: shopId,  // Associer l'ID de la boutique
                  id_day: day.id_day,
                  hours: day.isOpen ? day.timeSlots.flatMap((slot: { startHour: number, endHour: number }) => [
                    { id_hour: slot.startHour, id_state: 1 },  // Heure de début
                    { id_hour: slot.endHour, id_state: 2 }    // Heure de fin
                  ]) : [] // Si fermé, pas d'horaires
                };
              });
      
              console.log("Horaires préparés :", schedules);
              console.log("Horaires en JSON :", JSON.stringify(schedules));
      
              // Envoyer les horaires à schedules.controller
              this.schedulesService.insert(schedules).subscribe({
                next: () => {
                  this.toastr.success('Boutique créée avec succès!', 'Succès', { timeOut: 1000 });
                },
                error: (err) => {
                  this.toastr.error('Une erreur s\'est produite lors de la création des horaires.', 'Erreur', { timeOut: 1000 });
                  console.error('Erreur lors de la création des horaires:', err);
                }
              });
            },
            error: (err) => {
              this.toastr.error('Une erreur s\'est produite lors de la création de la boutique.', 'Erreur', { timeOut: 1000 });
              console.error('Erreur lors de la création de la boutique:', err);
            }
          });
        },
        error: (error) => {
          console.error("Error fetching user data: ", error);
        }
      });
    } else {
      this.toastr.error("Veuillez renseigner tous les champs", "Erreur", { timeOut: 1000 });
    }
  }
  
    
}
