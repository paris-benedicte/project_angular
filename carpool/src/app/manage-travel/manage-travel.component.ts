import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Travel } from '../models/travel.type';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-manage-travel',
  standalone: true,
  imports: [],
  templateUrl: './manage-travel.component.html',
  styleUrl: './manage-travel.component.scss'
})
export class ManageTravelComponent {
  http: HttpClient = inject(HttpClient);
  snackBar: MatSnackBar = inject(MatSnackBar);
  authentification: AuthentificationService = inject(AuthentificationService);
  listeTravel: Travel[] = [];
  ngOnInit(){
    this.refresh();
  }

  refresh(){
    this.http.get<Travel[]>("http://carpoolangular/list_travel.php")
    .subscribe((resultat) => this.listeTravel = resultat);
  }
  

}
