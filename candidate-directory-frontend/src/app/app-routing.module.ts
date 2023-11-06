import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { EditCandidateComponent } from './edit-candidate/edit-candidate.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';

const routes: Routes = [
  {
    path : '',
    component : CandidateListComponent
  },
  {
    path : 'edit',
    component : EditCandidateComponent
  },
  {
    path : 'add',
    component : AddCandidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
