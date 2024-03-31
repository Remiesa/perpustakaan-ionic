import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedBooksPageRoutingModule } from './saved-books-routing.module';

import { SavedBooksPage } from './saved-books.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedBooksPageRoutingModule
  ],
  declarations: [SavedBooksPage]
})
export class SavedBooksPageModule {}
