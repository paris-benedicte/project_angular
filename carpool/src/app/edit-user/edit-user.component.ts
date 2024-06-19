import { HttpClient} from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../models/Utilisateur.type';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule,], //HttpClientModule], => interceptor appconfi.ts
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  //création des roles (admin/user)
  listeRoles: string[] = ["utilisateur", "administrateur", "modérateur"];
  //création formgroup => formulaire
  formBuilder: FormBuilder = inject(FormBuilder);
  formulaire: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],//ici on peut mettre Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g), https://regexr.com/
    password: ["", [Validators.required]],
    firstname: ["", [Validators.required]],
    lastname: ["", [Validators.required]],
    role: ["utilisateur", [Validators.required]] // role par defaut => le role le plus commun
  })

  http: HttpClient = inject(HttpClient);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router =inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  idUtilisateur? :number;

  ngOnInit(){
    this.route.params.subscribe(
      (parametresurl) =>{
        //id présent dans url et entier
        if(parametresurl["id"] && !isNaN(parametresurl["id"])){
          // création nouveau Formgroup  sans validateur pour mdp
          this.formulaire = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", []],
            firstname: ["", [Validators.required]],
            lastname: ["", [Validators.required]],
            role: ["utilisateur", [Validators.required]] 
          });

            this.http.get<Utilisateur>("http://carpoolangular/get_user.php?id="+ parametresurl["id"])
            .subscribe({
              next: (user: Utilisateur) => {this.formulaire.patchValue(user); this.idUtilisateur = user.id;},
              error:() => alert("Erreur inconnue contactez l'administrateur")
            });
          
        } else {
          this.formulaire = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]],
            firstname: ["", [Validators.required]],
            lastname: ["", [Validators.required]],
            role: ["utilisateur", [Validators.required]]
          });
        }
      }
    )
  }
  //validation formulaire
  onSubmit(){
    if(this.formulaire.valid){
      const url: string = this.idUtilisateur == null ?'http://carpoolangular/add_user.php'
      : 'http://carpoolangular/edit_user.php?id=' + this.idUtilisateur;


        this.http.post(url, this.formulaire.value)
        .subscribe({
          next:(resultat) => {
            this.snackBar.open("l'utilisateur a bien été ajouté", undefined, {
              duration: 3000,
              horizontalPosition: "center",
              verticalPosition: "top",
              panelClass: "valid",
            });

          this.router.navigateByUrl("/manage-user");

          },
          error:(resultat) => alert("Erreur inconnue contactez votre administrateur"),
        });
    }
  }
}
