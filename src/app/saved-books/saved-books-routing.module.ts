import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedBooksPage } from './saved-books.page';

const routes: Routes = [
  {
    path: '',
    component: SavedBooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedBooksPageRoutingModule {}
