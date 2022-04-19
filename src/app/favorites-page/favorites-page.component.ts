import { Component } from '@angular/core';
import { RandomPhotoService } from './../shared/services/random-photo.service';
import { FavoritePhotoModel } from '../shared/interfaces';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent {
  public favoritePhotos: FavoritePhotoModel[] = [];

  constructor(private photoService: RandomPhotoService) { 
    this.favoritePhotos = this.photoService.getFavoritePhotos();
  }

  public setPhotoUrl(url: string): void {
    this.photoService.setPhotoUrl(url);
  }
}
