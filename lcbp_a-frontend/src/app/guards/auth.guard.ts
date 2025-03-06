import { CanActivateFn, Navigation, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const auth = inject(AuthService);
  const router = inject(Router);
  const token:string|null = sessionStorage.getItem("LCBPauth");
  const navigation: Navigation | null = router.getCurrentNavigation();
  if(token!="undefined" && token!=null){
    
    // if (navigation) {
    //   console.log('Current URL:', navigation.finalUrl?.toString()); // Get the full URL
    // }
    
    auth.authenticationToken(token).subscribe({
      next: (data) => {
        console.log("guard Data guard Data guard Data :::::   ",data);
        
        if(!auth.isAuthenticated() && navigation!.finalUrl?.toString().includes("/profile")){
          // if(!auth.isAuthenticated()){
          router.navigateByUrl('/login');
          return false;
        }
        else if(!data || data.name!="admin" && navigation!.finalUrl?.toString().includes("/admin")){
          router.navigateByUrl('/');
          return false;
        }
        return true;
      }
    });
  }
  else if(!auth.isAuthenticated() && navigation!.finalUrl?.toString().includes("/profile")){
    // if(!auth.isAuthenticated()){
    router.navigateByUrl('/login');
    return false;
  }
  else if(!auth.isAuthenticated() && navigation!.finalUrl?.toString().includes("/admin")){
    router.navigateByUrl('/');
    return false;
  }
  return true;
}
