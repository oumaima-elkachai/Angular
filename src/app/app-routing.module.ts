import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ListEventComponent } from './components/list-event/list-event.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path : '', component : ListEventComponent},
  {path : 'addEvent', component : AddEventComponent},
 
  {path : 'update/:id', component : AddEventComponent},
  {path : 'event', component : ListEventComponent},
  {path : 'event/:id', component : ListEventComponent},
  {path :'**' , component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
