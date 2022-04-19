import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, of } from 'rxjs';
import { RandomPhotoService } from 'src/app/shared/services/random-photo.service';

import { HomePageComponent } from './home-page.component';
import { PhotoModel } from './../../shared/interfaces';

const photoDataMock: PhotoModel[] = [{ 
  urls: { small: 'd' },
  id: '123',
  smallUrl: 'url' 
}];

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let http: HttpClient;
  let snackBar: MatSnackBar;
  let service: RandomPhotoService;

  beforeEach(() => {
    service = new RandomPhotoService(http, snackBar);
    component = new HomePageComponent(service);
  })

  it('should get photo data when OnInit', () => {
    const spy = spyOn(service, 'createRandomPhotos').and.returnValue(of(photoDataMock));

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.photoData.length).toBeGreaterThanOrEqual(1);
  });

  it('should unsubscribe when OnDestroy', () => {
    let unsubscriptionSpy;

    component['subscription'] = of().subscribe();
    unsubscriptionSpy = spyOn(component['subscription'], 'unsubscribe');

    component.ngOnDestroy();
    expect(unsubscriptionSpy).toHaveBeenCalled();
  });

  it('should get photo data', () => {
    const spy = spyOn(component, 'getPhoto');

    component.getPhoto();

    expect(spy).toHaveBeenCalled();
  });

  it('should get photo data with new photos', () => {
    const spy = spyOn(service, 'fetchPhotos').and.returnValue(of(photoDataMock));

    component.getMore();

    expect(spy).toHaveBeenCalled();
    expect(component.photoData.length).toBeGreaterThanOrEqual(1);
  });  

  it('should add photo to favorite photos', () => {
    const photoMock = { id: '123', url: 'test'};

    let favoritePhotos;

    localStorage.setItem('favorites', JSON.stringify([photoMock]));
    service.addToFavorites(photoMock.id, photoMock.url);
    favoritePhotos = service.getFavoritePhotos();

    expect(favoritePhotos[0]).toEqual(photoMock);
  });
});
