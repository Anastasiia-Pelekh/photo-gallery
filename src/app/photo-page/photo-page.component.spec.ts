import { PhotoPageComponent } from './photo-page.component';
import { RandomPhotoService } from 'src/app/shared/services/random-photo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

describe('PhotoPageComponent', () => {
  let http: HttpClient;
  let snackBar: MatSnackBar;
  let component: PhotoPageComponent;
  let service: RandomPhotoService;

  beforeEach(() => {
    service = new RandomPhotoService(http, snackBar);
    component = new PhotoPageComponent(service);
  })

  it('should remove photo from list by url', () => {
    const dataMock = { id: '123', url: 'test'};

    let favoritePhotos;

    localStorage.setItem('favorites', JSON.stringify([dataMock]));
    service.addToFavorites(dataMock.id, dataMock.url);
    favoritePhotos = service.getFavoritePhotos();
    service.removePhoto(dataMock.url);

    expect(JSON.stringify(favoritePhotos)).not.toBe(JSON.stringify(dataMock));
  });
});
