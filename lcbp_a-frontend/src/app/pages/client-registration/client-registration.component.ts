import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})
export class ClientRegistrationComponent {
  auth = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  formatPhone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); 
    value = value.slice(0, 10); 

    const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1-').slice(0, 14);

    input.value = formattedValue; 
  }

  onSubmit(form: NgForm) {
    if(form.valid){
      try {
      this.auth.postCredentials(form.value);
      this.toastr.success("Inscription réussie !", "Inscrit", { timeOut: 1500 });
      this.router.navigate(["/"]);
      } catch (error:any) {
      this.toastr.error(error);
      }
    }
    else{
      this.toastr.error("Veuillez renseigner tous les champs","Erreur",{timeOut : 1000});
    }
  }
  
  navToLogin(){
    this.router.navigate(['/login']);
  }
}
