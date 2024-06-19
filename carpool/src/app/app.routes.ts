import { Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { administrateurGuard } from './administrateur.guard';
import { gestionnaireGuard } from './gestionnaire.guard';
import { TravelComponent } from './travel/travel.component';
import { ManageTravelComponent } from './manage-travel/manage-travel.component';
// création route pour edit_user
export const routes: Routes = [
    {path: "home", component: HomeComponent },
    {path: "trajet", component:TravelComponent},
    {path: "add-user", component: EditUserComponent, canActivate:[administrateurGuard]},
    {path: "edit-user/:id", component: EditUserComponent, canActivate:[administrateurGuard]},
    //{path: "edit-travel/:id_travel", component: EditTravelComponent, canActivate[administrateurGuard]}
    {path: "manage-user", component: ManageUserComponent, canActivate:[gestionnaireGuard]},
    {path: "manage-travel", component: ManageTravelComponent},
    {path: "connexion", component: ConnexionComponent},
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "**", component: NotFoundComponent},
];
