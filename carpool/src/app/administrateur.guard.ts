import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const administrateurGuard: CanActivateFn = (route, state) => {
  const authentification = inject(AuthentificationService);
  const router = inject(Router);
  const snackBar: MatSnackBar = inject(MatSnackBar);

  if(authentification.role == "administrateur"){
    return true;
  } else {
    snackBar.open("Vous ne pouvez pas accéder à cette page, veuillez vous connecter avec un compte administrateur", undefined, {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: "error"
    });

    return router.createUrlTree(["/connexion"]);
  }

};
