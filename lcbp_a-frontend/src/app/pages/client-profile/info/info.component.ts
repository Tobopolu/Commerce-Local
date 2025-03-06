import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {

  isNewPW:boolean = false;
  auth: AuthService;
  toastr: ToastrService;
  userForm!: FormGroup;
  userData!: User;
  eyes: { [key: string]: boolean } = {
    "button-addon0": false,
    "button-addon1": false,
    "button-addon2": false
  };

  constructor(private fb: FormBuilder, auth: AuthService, toastr: ToastrService) {
    this.auth = auth;
    this.toastr = toastr;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z\\s\\-]+')]],
      lastname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z\\s\\-]+')]],
      phone: ['', [Validators.required, Validators.pattern('(\\d{2}-){4}\\d{2}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      newpassword: [''],
      confpassword: ['']
    });
    this.dataPatch();
  }

  dataPatch(){
    this.auth.getUserCredentials().subscribe({
      next: (data:any) => {
        const { password, newpassword, confpassword, ...filteredData } = data;
        this.userData = filteredData as User;
        this.userForm.patchValue(filteredData);
      },
      error: (error) => {
        console.error("Error fetching user data: ", error);
      }
    });

  }

  handleClick(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const key = target.id as keyof typeof this.eyes;
    this.eyes[key] = !this.eyes[key];
  }

  formatPhone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').slice(0, 10);
    input.value = value.replace(/(\d{2})(?=\d)/g, '$1-').slice(0, 14);
    this.userForm.controls['phone'].setValue(input.value);
  }

  matchPassword() {
    const newpassword = this.userForm.get('newpassword')?.value;
    const confirmPassword = this.userForm.get('confpassword')?.value;
    return newpassword === confirmPassword || !newpassword || !confirmPassword;
  }

  onSubmit() {
    if (!this.matchPassword()) {
      this.toastr.error("Les mots de passe ne correspondent pas", "Erreur", { timeOut: 1000 });
      return;
    }
    console.log(this.userForm);
    
    if (this.userForm.valid) {
      const tmpauth = {"email": this.userData.email,"password":this.userForm.value.password} 
      this.auth.authenticationCredentials(tmpauth).subscribe({
        next: () => {
          console.log('first');
          
          this.auth.updateInfo(this.userForm.value,this.userData.id_user).subscribe({
            next: () => {
              console.log('second');
              
              this.toastr.success("Informations mises à jour avec succès", "Succès", { timeOut: 1500 });
              this.dataPatch();
            },
            error: (errorMessage) => {
              this.toastr.error(errorMessage, "Erreur", { timeOut: 1500 });
            }
          });
        },
        error: (errorMessage) => {
          this.toastr.error(errorMessage, "Erreur", { timeOut: 1500 });
        }
      });
    } else {
      this.toastr.error("Veuillez remplir tous les champs correctement", "Erreur", { timeOut: 1000 });
    }
  }
}
