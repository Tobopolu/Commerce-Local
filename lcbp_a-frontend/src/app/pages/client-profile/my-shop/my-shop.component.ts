import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-my-shop',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './my-shop.component.html',
  styleUrl: './my-shop.component.css'
})
export class MyShopComponent implements OnInit {

  selected: string = 'my-infos';

  constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
  
      // Changement couleurs nav
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.selected = this.route.firstChild?.snapshot.url[0].path || 'my-infos';
      });
      switch (this.router.url.split('/')[3]) {
        case 'my-infos':
          this.selected = 'my-infos';
          
          break;

        case 'my-products':
          this.selected = 'my-products';
          
          break;

        case 'my-events':
          this.selected = 'my-events';
          
          break;
      
        default:
          break;
      }
      
    }

}
