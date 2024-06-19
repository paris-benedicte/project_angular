import { Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, HttpClientModule], //ne pas commenter HttpClient Module pour appconfig.ts
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  generateurFormulaire: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  authentification = inject(AuthentificationService);

  formulaire: FormGroup = this.generateurFormulaire.group({
    email : ["", [Validators.required, Validators.email]],
    password : ["", [Validators.required]],
  })

  onConnexion(){
    if(this.formulaire.valid){
      console.log("Formulaire validé");
      console.log(this.formulaire.value);
      this.http.post<any>("http://carpoolangular/connect.php", this.formulaire.value)
      .subscribe((resultat: any) => {localStorage.setItem("jwt",resultat.jwt);
      this.authentification.connexion();
      this.router.navigateByUrl("/home")});
    }
  }

}
