import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../models/Utilisateur.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [MatFormFieldModule, 
            MatSelectModule, MatIconModule, 
            MatDividerModule,MatButtonModule, 
            FormsModule, ReactiveFormsModule,
            MatRadioModule],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss'
})
export class TravelComponent {

  //création formulaire
  formBuilder: FormBuilder = inject(FormBuilder);
  formulaire: FormGroup = this.formBuilder.group({
    destination_travel: ["", [Validators.required]],//ville destination
    nbre_sits_travel: ["", [Validators.required]],//nbre places
    depart_travel: ["", [Validators.required]],//ville de départ
    start_hour_travel:["", [Validators.required]],//horaire de départ
    start_end_travel: ["", [Validators.required]],// horaire de fin
    car_travel: ["", [Validators.required]],//véhicule
    pref_travel:["", [Validators.required]],//préférence
    comment_travel: ["", [Validators.required]],// commentaires
    //role: ["utilisateur", Validators]
  });


  http: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  idTravel? :number;
  snackBar: MatSnackBar = inject(MatSnackBar); 
  ngOnInit(){
    this.route.params.subscribe(
      (parametresurl) => {
        //si l'utilisateur présent dans url et si int
        if(parametresurl["id_travel"] && !isNaN(parametresurl["id_travel"])){
          this.formulaire = this.formBuilder.group({
            destination_travel: ["", [Validators.required]],//ville destination
            nbre_sits_travel: ["0", [Validators.required]],//nbre places
            depart_travel: ["", [Validators.required]],//ville de départ
            start_hour_travel: ["", [Validators.required]],//horaire de départ
            start_end_travel: ["", [Validators.required]],// horaire de fin
            car_travel: ["", [Validators.required]],//véhicule
            pref_travel: ["", [Validators.required]],//préférence
            comment_travel: ["", []],// commentaires pas obligatoire
          });

        }
      }
    )

  }

  onSubmit(){
    //soumission formulaire
    if(this.formulaire.valid){
      const url: string = this.idTravel == null ?'http://carpoolangular/add_travel.php':
      'http://carpoolangular/edit_travel.php?id_travel=' + this.idTravel;

      this.http.post(url,this.formulaire.value).subscribe({
        next:(resultat) => {
          this.snackBar.open("Le trajet a bien été ajouté !", undefined,{
            duration: 2000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "Valid",
          });

          this.router.navigateByUrl("/manage-travel");
        },
        error:(resultat) => alert("Erreur inconnue cuillez alerter votre administrateur"),
      })
    }
  }

}
