import { HttpClient} from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Utilisateur } from '../models/Utilisateur.type';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatIconModule], //, HttpClientModule =< interceptor app.config.ts
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {

  http: HttpClient = inject(HttpClient);
  snackBar: MatSnackBar = inject(MatSnackBar);
  authentification: AuthentificationService = inject(AuthentificationService);
  listeUtilisateur: Utilisateur[] = [];
  ngOnInit(){
    this.refresh();
  }

  refresh(){
      this.http.get<Utilisateur[]>("http://carpoolangular/list_user.php")
      .subscribe((resultat) => this.listeUtilisateur = resultat);
  }

  onSuppressionUtilisateur(idUtilisateur: number){
      this.http.delete("http://carpoolangular/delete_user.php?id=" + idUtilisateur)
      .subscribe({
        next: (resultat) => {
          this.refresh();
          this.snackBar.open("l'utilisateur a bien été supprimé", undefined, { duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass:"valid"
          });
        },
      
        error: (resultat) => this.snackBar.open("Erreur inconnue, contactez votre administrateur", undefined, {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'error'
        }),
      });
  }
}

