import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FavoritesPageComponent } from '../favorites-page/favorites-page.component';
import { PhotoPageComponent } from '../photo-page/photo-page.component';

@NgModule({
  declarations: [
    FavoritesPageComponent,
    PhotoPageComponent,
  ], 
  imports: [
    MatCardModule,
    CommonModule,
    MatSnackBarModule,
    RouterModule.forChild([
      {path: 'favorites', component: FavoritesPageComponent},
      {path: 'photos/:id', component: PhotoPageComponent},
      {path: '**', redirectTo: '/'},
    ])
  ],
  exports: [
    RouterModule,
  ]
})
export class SharedModule { }