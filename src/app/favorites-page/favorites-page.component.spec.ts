import { FavoritesPageComponent } from './favorites-page.component';
import { RandomPhotoService } from 'src/app/shared/services/random-photo.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'

describe('FavoritesPageComponent', () => {
  let http: HttpClient;
  let snackBar: MatSnackBar;
  let component: FavoritesPageComponent;
  let service: RandomPhotoService;

  beforeEach(() => {
    service = new RandomPhotoService(http, snackBar);
    component = new FavoritesPageComponent(service);
  })

  it('should set photo url', () => {
    const urlMock = 'test';

    service.setPhotoUrl(urlMock);

    expect(service.getPhotoUrl()).toBe(urlMock);
  });

  it('should get favorite photos', () => {
    const photoMock = { id: '123', url: 'test'};

    let favoritePhotos;

    localStorage.setItem('favorites', JSON.stringify([photoMock]));
    service.addToFavorites(photoMock.id, photoMock.url);
    favoritePhotos = service.getFavoritePhotos();

    expect(favoritePhotos[0]).toEqual(photoMock);
  });
});
