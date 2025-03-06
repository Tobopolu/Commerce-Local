import { AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterModule, Router } from '@angular/router';
import { ShopsService } from '../../services/shops.service';
import { Shop } from '../../interfaces/shop';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SchedulesService } from '../../services/schedules.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shop',
  imports: [RouterModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent implements OnInit, AfterViewInit {

  
  selected: string = 'promotions';
  shopId?: number;  // Pour stocker l'ID de la boutique
  shopDetails: Shop | null = null;  // Pour stocker les détails de la boutique
  schedules: any [] = [];
  groupedSchedules: any[] = [];
  baseUrl:string = environment.urlBase; 

  @ViewChild('sections') section!: ElementRef;

  jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopsService,
    private schedulesService: SchedulesService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   // Récupérer l'ID de la boutique depuis les paramètres de la route
  //   this.shopId = +this.route.snapshot.paramMap.get('id')!; 

  //   // Appeler le service pour récupérer les données de la boutique
  //   this.shopService.getShopById(this.shopId).subscribe(shop => {
  //     this.shopDetails = shop;  // Stocker les détails de la boutique
  //   });

  //   // Récupérer les horaires de la boutique
  //   this.schedulesService.getSchedulesByShop(this.shopId).subscribe({
  //     next: (data) => {
  //       this.schedules = data;
  //       this.groupSchedules();
  //       console.log('Horaires récupérés :', this.schedules);
  //     },
  //     error: (err) => console.error('Erreur lors du chargement des horaires', err),
  //   });

  //   // Changement couleurs nav
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     this.selected = this.route.firstChild?.snapshot.url[0].path || 'promotions';
  //   });
  // }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.shopId = Number(params.get('id')); 
      this.loadShopData(); // Recharger les données de la boutique
    });
    // Changement couleurs nav
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.selected = this.route.firstChild?.snapshot.url[0].path || 'promotions';
      // console.log(this.router.url.split('/')[3]);
    });
    
    if(this.router.url.split('/')[3]!=this.selected){
      this.selected=this.router.url.split('/')[3];
      
    }
  }
  
  loadShopData(): void {
    if (!this.shopId) return;
  
    // Charger les détails de la boutique
    this.shopService.getShopById(this.shopId).subscribe(shop => {
      this.shopDetails = shop;
    });
  
    // Charger les horaires de la boutique
    this.schedulesService.getSchedulesByShop(this.shopId).subscribe({
      next: (data) => {
        this.schedules = data;
        this.groupSchedules();
      },
      error: (err) => console.error('Erreur lors du chargement des horaires', err),
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.section.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);  
  }
  // groupSchedules() {
  //   const scheduleMap = new Map<number, { open?: string, close?: string }>();
  
  //   // Remplir le map avec les horaires disponibles
  //   this.schedules.forEach(schedule => {
  //     const dayIndex = schedule.id_day - 1; // Convertir en index basé sur 0
  
  //     if (!scheduleMap.has(dayIndex)) {
  //       scheduleMap.set(dayIndex, {});
  //     }
  
  //     if (schedule.id_state === 1) {
  //       scheduleMap.get(dayIndex)!.open = schedule.time;
  //     } else if (schedule.id_state === 2) {
  //       scheduleMap.get(dayIndex)!.close = schedule.time;
  //     }
  //   });
  
  //   // Assurer que chaque jour est bien présent, même s'il n'a pas d'horaires
  //   this.groupedSchedules = this.jours.map((day, index) => {
  //     const times = scheduleMap.get(index); // Récupérer les horaires du jour
  
  //     return {
  //       day,
  //       hours: times && times.open && times.close ? `${times.open} - ${times.close}` : 'Fermé'
  //     };
  //   });
  // }


  


  // groupSchedules() {
  //   const scheduleMap = new Map<number, string[]>(); // Map avec tableau pour stocker plusieurs plages horaires
  
  //   // Remplir le map avec toutes les plages horaires par jour
  //   this.schedules.forEach(schedule => {
  //     const dayIndex = schedule.id_day - 1; // Convertir en index basé sur 0
  
  //     if (!scheduleMap.has(dayIndex)) {
  //       scheduleMap.set(dayIndex, []);
  //     }
  
  //     if (schedule.id_state === 1) {
  //       // Ajouter la plage d'ouverture avec un marqueur pour associer ouverture/fermeture
  //       scheduleMap.get(dayIndex)!.push(schedule.time + ' -');
  //     } else if (schedule.id_state === 2) {
  //       // Compléter la dernière plage en cours
  //       const lastIndex = scheduleMap.get(dayIndex)!.length - 1;
  //       if (lastIndex >= 0) {
  //         scheduleMap.get(dayIndex)![lastIndex] += ' ' + schedule.time;
  //       }
  //     }
  //   });
  
  //   // Construire groupedSchedules avec toutes les plages ou "Fermé" si aucune plage
  //   this.groupedSchedules = this.jours.map((day, index) => {
  //     const hours = scheduleMap.get(index);
  //     return {
  //       day,
  //       hours: hours && hours.length > 0 ? hours.join(' ') : 'Fermé'
  //     };
  //   });
  // }


  groupSchedules() {
    const scheduleMap = new Map<number, string[]>(); // Map avec tableau pour stocker plusieurs plages horaires
  
    // Remplir le map avec toutes les plages horaires par jour
    this.schedules.forEach(schedule => {
      const dayIndex = schedule.id_day - 1; // Convertir en index basé sur 0
  
      if (!scheduleMap.has(dayIndex)) {
        scheduleMap.set(dayIndex, []);
      }
  
      if (schedule.id_state === 1) {
        scheduleMap.get(dayIndex)!.push(schedule.time + ' -');
      } else if (schedule.id_state === 2) {
        const lastIndex = scheduleMap.get(dayIndex)!.length - 1;
        if (lastIndex >= 0) {
          scheduleMap.get(dayIndex)![lastIndex] += ' ' + schedule.time;
        }
      }
    });
  
    // Construire groupedSchedules avec toutes les plages ou "Fermé" si aucune plage
    this.groupedSchedules = this.jours.map((day, index) => {
      const hours = scheduleMap.get(index);
      return {
        day,
        hours: hours && hours.length > 0 ? hours : ['Fermé'] // Stocker comme un tableau
      };
    });
  }
  
  
  
  
}