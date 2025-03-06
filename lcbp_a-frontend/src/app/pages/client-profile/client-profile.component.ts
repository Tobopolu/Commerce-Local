import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-profile',
  imports: [RouterModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent {
  role:string = ""; //tmp
  auth: AuthService;
  selected: string = 'info';

  constructor(auth: AuthService,private router: Router, private route: ActivatedRoute) {
    this.auth = auth;
    let role;

    this.auth.getRoleByEmail().subscribe({
      next: (data:any) => {
        this.role = data.name;
        if(data.name ==="admin"){
          router.navigate(['/admin']);
        }
        else{
          this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
              this.selected = this.route.firstChild?.snapshot.url[0].path || 'info';
            });
        }
        
      },
      error: (error) => {
        console.error("Error fetching user data: ", error);
      }
    });


  }

}
