import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  if(sessionStorage.getItem("token")){
    // authorized user
    return true
  }else{
    // unauthorized user
    alert("Unauthorized Access . Please Login....")
    router.navigateByUrl("/login")
    return false
  }
};
