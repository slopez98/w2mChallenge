import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { CreateComponent } from './routes/create/create.component';
import { EditComponent } from './routes/edit/edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Inicio' },
  { path: 'create', component: CreateComponent, title: 'Crea un nuevo Héroe' },
  { path: 'edit/:id', component: EditComponent, title: 'Edita el Héroe' },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
