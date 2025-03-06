import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-login',
  imports: [FormsModule],
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css'
})
export class ClientLoginComponent {

  router = inject(Router)
  toastr= inject(ToastrService)
  auth = inject(AuthService);
  // onSubmit(form: NgForm) {
  //   if(form.valid){
  //     let message:any = this.auth.authenticationCredentials(form.value);
  //     this.toastr.error(message);   
        
  //   }
  //   else{
  //     this.toastr.error("Veuillez renseigner tous les champs","Erreur",{timeOut : 1000});
      
  //   }
  // }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.auth.authenticationCredentials(form.value).subscribe({
        next: () => {
          this.toastr.success("Connexion réussie !","Connecté",{timeOut:1500});
          this.router.navigate(["/"]);
        },
        error: (errorMessage) => {
          this.toastr.error(errorMessage, "Erreur", { timeOut: 1500 });
        }
      });
    } else {
      this.toastr.error("Veuillez renseigner tous les champs", "Erreur", { timeOut: 1500 });
    }
  }
  navToRegister(){
    this.router.navigate(['/register']);
  }
}
