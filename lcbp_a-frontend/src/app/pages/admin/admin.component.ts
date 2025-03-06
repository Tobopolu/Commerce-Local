import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  selected: string = '';

  constructor(private router: Router, private route: ActivatedRoute){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.selected = this.route.firstChild?.snapshot.url[0].path || 'dashboard';
      });
  }
}
